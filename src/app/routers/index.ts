import express from 'express'
import { userRouter } from '../modules/users/user.route'
import { shopRouter } from '../modules/shop/shop.route'
import { productRouter } from '../modules/Products/ProductsRoute'
import { categoryRouter } from '../modules/Categories/CategoriesRoute'
import { couponRouter } from '../modules/Coupon/CouponRoute'
import { reviewRouter } from '../modules/Review/ReviewRoute'
import { followerRouter } from '../modules/Follower/FollowersRoute'
import { authRouter } from '../modules/Auth/AuthRoute'
const router = express.Router()

const moduleRoutes = [
  {
    path: '/auth',
    route: authRouter,
  },
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
  {
    path: '/shop/follow',
    route: followerRouter,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
