import { Prisma } from '@prisma/client'
import { paginationHelpers } from '../../helpers/PaginationHelpers'
import prisma from '../../helpers/prisma'
import { ImageUpload } from '../../utils/ImageUpload'
import { TActive } from '../users/user.containts'
import { TProduct } from './ProductsInterface'
import { searchableFields } from './ProductsContaints'

const createProduct = async (files: any, payload: TProduct) => {
  // Upload files and collect their URLs
  const images: string[] = []
  if (files) {
    for (const file of files) {
      // Generate a unique name for each image, for example using a timestamp
      const uniqueName = `${payload.name}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

      // Upload the image to Cloudinary with the unique name
      const response: any = await ImageUpload(uniqueName, file.path)

      // Collect the secure URL of the uploaded image
      images.push(response.secure_url)
    }
  }

  const shopData = await prisma.shop.findUniqueOrThrow({
    where: {
      id: payload.shopId,
    },
  })

  await prisma.vendor.findUniqueOrThrow({
    where: {
      id: shopData.vendorId,
      isDeleted: false,
    },
  })

  await prisma.category.findUniqueOrThrow({
    where: {
      id: payload.categoryId,
    },
  })

  const result = await prisma.$transaction(async transactionClient => {
    const product = await transactionClient.product.create({
      data: {
        name: payload?.name,
        regular_price: Number(payload?.regular_price),
        discount_price: Number(payload?.discount_price),
        description: payload?.description,
        images: images,
        productStatus: payload.productStatus && payload.productStatus,
        inventory: Number(payload?.inventory),
        categoryId: payload?.categoryId,
        vendorId: shopData?.vendorId,
        shopId: payload?.shopId,
      },
    })
    const productSize = payload.productSize?.map(
      (s: { size: string; stock: string }) => ({
        size: s.size,
        stock: Number(s.stock),
        productId: product.id,
      }),
    )

    if (productSize) {
      try {
        await transactionClient.sizeOption.createMany({
          data: productSize,
        })
      } catch (error) {
        console.log(error)
      }
    }
    const productColors = payload.productColors?.map(
      (c: { color: string; colorStock: string; colorCode: string }) => ({
        color: c.color,
        stock: Number(c.colorStock),
        code: c.colorCode,
        productId: product.id,
      }),
    )

    if (productColors) {
      try {
        await transactionClient.colorOption.createMany({
          data: productColors,
        })
      } catch (error) {
        console.log(error)
      }
    }

    return {
      product,
    }
  })
  return result
}

const retrieveAllProduct = async (fieldParams: any, paginationOption: any) => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOption)
  const { searchTerm, ...filterData } = fieldParams

  const andCondition: Prisma.ProductWhereInput[] = []

  // search params
  if (fieldParams.searchTerm) {
    andCondition.push({
      OR: searchableFields.map(field => ({
        [field]: {
          contains: fieldParams.searchTerm,
          mode: 'insensitive',
        },
      })),
    })
  }

  // specific field
  if (Object.keys(filterData)?.length > 0) {
    andCondition.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: filterData[key],
        },
      })),
    })
  }

  const whereCondition: Prisma.ProductWhereInput = { AND: andCondition }

  const result = await prisma.product.findMany({
    where: whereCondition,
    skip: skip,
    take: limit,
    orderBy:
      sortBy && sortOrder
        ? {
            [sortBy]: sortOrder,
          }
        : {
            createdAt: 'desc',
          },
    include: {
      category: true,
      colors: true,
      sizes: true,
      vendor: {
        select: {
          name: true,
        },
      },
      shop: true,
      reviews: {
        select: {
          rating: true,
        },
      },
      orders: true,
      wishlist: true,
    },
  })

  const total = await prisma.product.count({
    where: whereCondition,
  })

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}
const retrieveAllProductByVendor = async (user: any) => {
  const vendorData = await prisma.vendor.findUniqueOrThrow({
    where: {
      email: user?.email,
    },
  })
  const result = await prisma.product.findMany({
    where: {
      vendorId: vendorData.id,
    },
    include: {
      category: true,
      colors: true,
      sizes: true,
      shop: true,
      vendor: {
        select: {
          name: true,
        },
      },
      reviews: {
        where: {
          reviewStatus: 'APPROVED',
        },
        select: {
          rating: true,
        },
      },
      orders: true,
      wishlist: true,
    },
  })

  return result
}

const allAvailableProducts = async (
  fieldParams: any,
  paginationOption: any,
) => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOption)
  const { searchTerm, ...filterData } = fieldParams

  const andCondition: Prisma.ProductWhereInput[] = []

  // search params
  if (fieldParams?.searchTerm) {
    andCondition.push({
      OR: searchableFields?.map(field => ({
        [field]: {
          contains: fieldParams?.searchTerm,
          mode: 'insensitive',
        },
      })),
    })
  }

  // specific field
  if (Object.keys(filterData)?.length > 0) {
    andCondition.push({
      AND: Object.keys(filterData).map(key => {
        if (key === 'minPrice') {
          return {
            OR: [
              { regular_price: { gte: Number(filterData[key]) } },
              { discount_price: { gte: Number(filterData[key]) } },
            ],
          }
        } else if (key === 'maxPrice') {
          return {
            OR: [
              { regular_price: { lte: Number(filterData[key]) } },
              { discount_price: { lte: Number(filterData[key]) } },
            ],
          }
        } else if (key === 'category') {
          return {
            category: {
              name: {
                equals: filterData[key],
                mode: 'insensitive',
              },
            },
          }
        } else {
          return {
            [key]: {
              equals: filterData[key],
            },
          }
        }
      }),
    })
  }

  const whereCondition: Prisma.ProductWhereInput = {
    AND: andCondition,
    isActive: 'APPROVED',
  }

  const result = await prisma.product.findMany({
    where: whereCondition,
    skip: skip,
    take: limit,
    orderBy:
      sortBy && sortOrder
        ? {
            [sortBy]: sortOrder,
          }
        : sortBy === 'reviews'
          ? {
              reviews: {
                _count: 'desc',
              },
            }
          : {
              createdAt: 'desc',
            },
    include: {
      category: true,
      colors: true,
      sizes: true,
      shop: true,
      vendor: {
        select: {
          name: true,
        },
      },
      reviews: {
        where: {
          reviewStatus: 'APPROVED',
        },
        select: {
          rating: true,
        },
      },
      orders: true,
      wishlist: true,
    },
  })

  const total = await prisma.product.count({
    where: whereCondition,
  })

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const allFlashSaleProducts = async () => {
  const result = await prisma.product.findMany({
    where: {
      productStatus: 'FLASH_SALE',
      isActive: 'APPROVED',
    },
    include: {
      category: true,
      colors: true,
      sizes: true,
      shop: true,
      vendor: {
        select: {
          name: true,
        },
      },
      reviews: {
        where: {
          reviewStatus: 'APPROVED',
        },
        select: {
          rating: true,
        },
      },
      orders: true,
      wishlist: true,
    },
  })

  return result
}

const allHomeProducts = async () => {
  const allProducts = await prisma.product.findMany({
    where: {
      productStatus: { in: ['HOT', 'NEW', 'DISCOUNT', 'FEATURED'] },
      isActive: 'APPROVED',
    },
    take: 40, // Total products to fetch (adjust based on requirements)
    include: {
      category: true,
      colors: true,
      sizes: true,
      shop: true,
      vendor: {
        select: {
          name: true,
        },
      },
      reviews: {
        where: {
          reviewStatus: 'APPROVED',
        },
        select: {
          rating: true,
        },
      },
      orders: true,
      wishlist: true,
    },
  })

  // Group products by their `productStatus`
  const groupedProducts = {
    allHotProducts: allProducts.filter(p => p.productStatus === 'HOT'),
    allNewProducts: allProducts.filter(p => p.productStatus === 'NEW'),
    allDiscountProducts: allProducts.filter(
      p => p.productStatus === 'DISCOUNT',
    ),
    allFeaturedProducts: allProducts.filter(
      p => p.productStatus === 'FEATURED',
    ),
  }

  return groupedProducts
}

const retrieveProductById = async (id: any) => {
  const product = await prisma.product.findUniqueOrThrow({
    where: { id },
    include: {
      category: { select: { id: true, name: true } }, // Fetch only relevant fields
      colors: true,
      sizes: true,
      vendor: {
        select: {
          name: true,
        },
      },
      shop: { select: { id: true, shopName: true } },
      reviews: {
        where: {
          reviewStatus: 'APPROVED',
        },
      },
      orders: {
        include: {
          order: {
            select: {
              customerId: true,
            },
          },
        },
      }, // Include only if needed
      wishlist: false, // Include only if needed
    },
  })

  // Fetch related products
  const relatedProducts = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      NOT: { id: product.id },
    },
    select: {
      id: true,
      name: true,
      regular_price: true,
      discount_price: true,
      images: true,
      productStatus: true,
    },
  })

  return {
    product,
    relatedProducts,
  }
}

const updateProductById = async (id: string, files: any, payload: any) => {
  const isExistProduct = await prisma.product.findUniqueOrThrow({
    where: {
      id: id,
    },
  })

  // Upload files and collect their URLs
  const images: string[] = isExistProduct?.images
  if (files) {
    for (const file of files) {
      // Generate a unique name for each image, for example using a timestamp
      const uniqueName = `${payload.name}-${Date.now()}-${Math.random().toString(16).substr(2, 9)}`

      // Upload the image to Cloudinary with the unique name
      const response: any = await ImageUpload(uniqueName, file.path)

      // Collect the secure URL of the uploaded image
      images.push(response.secure_url)
    }
  }

  const shopData = await prisma.shop.findUniqueOrThrow({
    where: {
      id: payload.shopId,
    },
  })

  await prisma.vendor.findUniqueOrThrow({
    where: {
      id: shopData.vendorId,
      isDeleted: false,
    },
  })

  await prisma.category.findUniqueOrThrow({
    where: {
      id: payload.categoryId,
    },
  })

  const result = await prisma.$transaction(async transactionClient => {
    const product = await transactionClient.product.update({
      where: {
        id: id,
      },
      data: {
        name: payload?.name,
        regular_price: Number(payload?.regular_price),
        discount_price: Number(payload?.discount_price),
        description: payload?.description,
        images: images,
        productStatus: payload.productStatus && payload.productStatus,
        inventory: Number(payload?.inventory),
        categoryId: payload?.categoryId,
        vendorId: shopData?.vendorId,
        shopId: payload?.shopId,
      },
    })
    const productSize = payload.productSize?.map(
      (s: { size: string; stock: string }) => ({
        size: s.size,
        stock: Number(s.stock),
        productId: product.id,
      }),
    )

    if (productSize) {
      try {
        await transactionClient.sizeOption.updateMany({
          where: {
            productId: id,
          },
          data: productSize,
        })
      } catch (error) {
        console.log(error)
      }
    }
    const productColors = payload.productColors?.map(
      (c: { color: string; colorStock: string; colorCode: string }) => ({
        color: c.color,
        stock: Number(c.colorStock),
        code: c.colorCode,
        productId: product.id,
      }),
    )

    if (productColors) {
      try {
        await transactionClient.colorOption.updateMany({
          where: {
            productId: id,
          },
          data: productColors,
        })
      } catch (error) {
        console.log(error)
      }
    }

    return {
      product,
    }
  })
  return result
}

const updateProductStatusId = async (id: string, status: TActive) => {
  await prisma.product.findUniqueOrThrow({
    where: {
      id: id,
    },
  })

  const result = await prisma.product.update({
    where: {
      id: id,
    },
    data: {
      isActive: status,
    },
  })

  return result
}

const deleteProductById = async (id: string) => {
  await prisma.product.findUniqueOrThrow({
    where: {
      id: id,
    },
  })

  const result = await prisma.product.update({
    where: {
      id: id,
    },
    data: {
      isActive: 'DELETE',
    },
  })

  return result
}

export const productServices = {
  createProduct,
  retrieveAllProduct,
  allAvailableProducts,
  allFlashSaleProducts,
  retrieveProductById,
  updateProductById,
  deleteProductById,
  updateProductStatusId,
  retrieveAllProductByVendor,
  allHomeProducts,
}
