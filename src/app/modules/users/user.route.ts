import express, { NextFunction, Request, Response } from 'express'
import { userControllers } from './user.controller'
import ValidationRequest from '../../utils/ValidationRequest'
import { userValidation } from './user.validation'
import Auth from '../../middlewares/Auth'
import { UserRole } from '@prisma/client'
import { upload } from '../../utils/ImageUpload'
const router = express.Router()

router.post(
  '/create-admin',
  ValidationRequest(userValidation.createAdmin),
  userControllers.createAdmin,
)

router.post(
  '/create-vendor',
  upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'cover', maxCount: 1 },
  ]),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data)
    next()
  },
  ValidationRequest(userValidation.createVendor),
  userControllers.createVendor,
)
router.post(
  '/create-customer',
  ValidationRequest(userValidation.createAdmin),
  userControllers.createCustomer,
)

router.get('/', userControllers.retrieveAllUsers)

router.get('/:id', userControllers.retrieveUserById)
// router.get(
//   '/my-profile',
//   Auth(
//     UserRole.ADMIN,
//     UserRole.CUSTOMER,
//     UserRole.SUPER_ADMIN,
//     UserRole.VENDOR,
//   ),
//   userControllers.myProfile,
// )

export const userRouter = router
