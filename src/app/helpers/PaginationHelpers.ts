// pagination helpers

import { TOptions } from '../interface/containts'

const calculatePagination = (options: TOptions) => {
  const page: number = Number(options.page) || 1
  const limit: number = Number(options.limit) || 10
  const skip: number = (Number(options.page) - 1) * Number(limit)
  const sortBy: string = options.sortBy || 'createdAt'
  const sortOrder: string = options.sortOrder || 'desc'

  return { page, limit, sortBy, sortOrder, skip }
}

export const paginationHelpers = { calculatePagination }
