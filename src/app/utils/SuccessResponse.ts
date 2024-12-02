import { Response } from 'express'

interface ISuccessResponse<T> {
  success: boolean
  status: number
  message: string
  data?: T
}

const SuccessResponse = <T>(res: Response, data: ISuccessResponse<T>) => {
  return res.status(data.status).json({
    success: data.success,
    status: data.status,
    message: data.message,
    data: data.data,
  })
}

export default SuccessResponse
