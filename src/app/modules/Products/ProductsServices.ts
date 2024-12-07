import prisma from '../../helpers/prisma'
import { ImageUpload } from '../../utils/ImageUpload'
import { TProduct } from './ProductsInterface'

const createProduct = async (files: any, payload: TProduct) => {
  // Upload files and collect their URLs
  const images: string[] = []
  if (files) {
    for (const file of files) {
      const response: any = await ImageUpload(payload.name, file.path) // Upload each file
      images.push(response.secure_url) // Collect uploaded URLs
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

const retrieveAllProduct = async () => {
  const result = await prisma.product.findMany({
    include: {
      colors: true,
      sizes: true,
    },
  })

  return result
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
  })

  return result
}

const retrieveProductById = async (id: any) => {
  const result = await prisma.product.findUniqueOrThrow({
    where: {
      id: id,
    },
  })

  return result
}

const updateProductById = async (id: string, payload: any) => {
  await prisma.product.findUniqueOrThrow({
    where: {
      id: id,
    },
  })

  const result = await prisma.product.update({
    where: {
      id: id,
    },
    data: payload,
  })

  return result
}

const deleteProductById = async (id: string) => {
  await prisma.product.findUniqueOrThrow({
    where: {
      id: id,
    },
  })

  const result = await prisma.product.delete({
    where: {
      id: id,
    },
  })

  return result
}

export const productServices = {
  createProduct,
  retrieveAllProduct,
  retrieveProductById,
  updateProductById,
  deleteProductById,
  retrieveAllProductByVendor,
}
