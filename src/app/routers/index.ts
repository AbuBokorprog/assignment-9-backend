import express from 'express'
import { userRouter } from '../modules/users/user.route'
import { shopRouter } from '../modules/shop/shop.route'
import { productRouter } from '../modules/Products/ProductsRoute'
import { categoryRouter } from '../modules/Categories/CategoriesRoute'
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
  {
    path: '/category',
    route: categoryRouter,
  },
  {
    path: '/products',
    route: productRouter,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
