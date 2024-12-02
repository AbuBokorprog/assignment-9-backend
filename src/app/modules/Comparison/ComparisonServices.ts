import prisma from '../../helpers/prisma'
import { TComparison } from './ComparisonInterface'

const createComparison = async (payload: TComparison) => {
  const comparison = await prisma.comparison.create({
    data: payload,
  })

  return comparison
}

const retrieveAllComparison = async () => {
  const result = await prisma.comparison.findMany({})

  return result
}

const retrieveComparisonById = async (id: any) => {
  const result = await prisma.comparison.findUniqueOrThrow({
    where: {
      id: id,
    },
  })

  return result
}

const updateComparisonById = async (id: string, payload: any) => {
  await prisma.comparison.findUniqueOrThrow({
    where: {
      id: id,
    },
  })

  const result = await prisma.comparison.update({
    where: {
      id: id,
    },
    data: payload,
  })

  return result
}

const deleteComparisonById = async (id: string) => {
  await prisma.comparison.findUniqueOrThrow({
    where: {
      id: id,
    },
  })

  const result = await prisma.comparison.delete({
    where: {
      id: id,
    },
  })

  return result
}

export const comparisonServices = {
  createComparison,
  retrieveAllComparison,
  retrieveComparisonById,
  updateComparisonById,
  deleteComparisonById,
}
