import express from 'express'
import { userRouter } from '../modules/users/user.route'
import { shopRouter } from '../modules/shop/shop.route'
const router = express.Router()

const moduleRoutes = [
  {
    path: '/users',
    route: userRouter,
  },
  {
    path: '/shop',
    route: shopRouter,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
