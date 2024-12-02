import prisma from '../../helpers/prisma'
import { TCategory } from './CategoriesInterface'

const createCategory = async (payload: TCategory) => {
  const category = await prisma.category.create({
    data: payload,
  })

  return category
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

const updateCategoryById = async (id: string, payload: any) => {
  await prisma.category.findUniqueOrThrow({
    where: {
      id: id,
    },
  })

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
