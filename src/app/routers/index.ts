import express from 'express'
import { userRouter } from '../modules/users/user.route'
import { shopRouter } from '../modules/shop/shop.route'
import { productRouter } from '../modules/Products/ProductsRoute'
import { categoryRouter } from '../modules/Categories/CategoriesRoute'
import { couponRouter } from '../modules/Coupon/CouponRoute'
import { reviewRouter } from '../modules/Review/ReviewRoute'
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
  {
    path: '/coupon',
    route: couponRouter,
  },
  {
    path: '/reviews',
    route: reviewRouter,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
