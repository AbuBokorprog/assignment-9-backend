import prisma from '../../helpers/prisma'
import { ImageUpload } from '../../utils/ImageUpload'
import { TCategory } from './CategoriesInterface'

const createCategory = async (file: any, payload: TCategory) => {
  if (file) {
    const path = file.path
    const response: any = await ImageUpload(payload.name as string, path)
    const secureUrl = response.secure_url
    payload.image = secureUrl
    const data = {
      name: payload.name,
      image: secureUrl,
      description: payload.description || null,
    }

    const category = await prisma.category.create({
      data: data,
    })

    return category
  }
}

const retrieveAllCategory = async () => {
  const result = await prisma.category.findMany({})

  return result
}

const retrieveCategoryById = async (id: any) => {
  const result = await prisma.category.findUniqueOrThrow({
    where: {
      id: id,
    },
  })

  return result
}

const updateCategoryById = async (
  file: any,
  id: string,
  payload: Partial<TCategory>,
) => {
  await prisma.category.findUniqueOrThrow({
    where: {
      id: id,
    },
  })

  if (file) {
    const path = file.path
    const response: any = await ImageUpload(payload.name as string, path)
    const secureUrl = response.secure_url
    payload.image = secureUrl
  }

  const result = await prisma.category.update({
    where: {
      id: id,
    },
    data: payload,
  })

  return result
}

const deleteCategoryById = async (id: string) => {
  await prisma.category.findUniqueOrThrow({
    where: {
      id: id,
    },
  })

  const result = await prisma.category.delete({
    where: {
      id: id,
    },
  })

  return result
}

export const categoryServices = {
  createCategory,
  retrieveAllCategory,
  retrieveCategoryById,
  updateCategoryById,
  deleteCategoryById,
}
