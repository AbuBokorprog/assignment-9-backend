import CatchAsync from '../../utils/CatchAsync'

const createOrder = CatchAsync(async () => {})
const retrieveOrder = CatchAsync(async () => {})
const retrieveOrderById = CatchAsync(async () => {})
const updateOrder = CatchAsync(async () => {})
const deleteOrder = CatchAsync(async () => {})

export const ordersController = {
  createOrder,
  retrieveOrder,
  retrieveOrderById,
  updateOrder,
  deleteOrder,
}
