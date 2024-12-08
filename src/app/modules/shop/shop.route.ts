import express, { NextFunction, Request, Response } from 'express'
import { shopController } from './shop.controller'
import ValidationRequest from '../../utils/ValidationRequest'
import { shopValidation } from './shop.validation'
import { upload } from '../../utils/ImageUpload'
import Auth from '../../middlewares/Auth'
import { UserRole } from '@prisma/client'
const router = express.Router()

router.post(
  '/',
  Auth(UserRole.VENDOR),
  upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'cover', maxCount: 1 },
  ]),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data)
    next()
  },
  ValidationRequest(shopValidation.createShop),
  shopController.createShop,
)
router.get('/', shopController.retrieveAllShop)
router.get(
  '/vendor-shops',
  Auth(UserRole.VENDOR),
  shopController.retrieveAllShopByVendor,
)
router.get('/:id', shopController.retrieveShopById)
router.patch('/:id', Auth(UserRole.VENDOR), shopController.updateShopById)
router.patch(
  '/status/update-status',
  Auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  shopController.updateStatus,
)
router.delete(
  '/:id',
  Auth(UserRole.ADMIN, UserRole.VENDOR, UserRole.SUPER_ADMIN),
  shopController.deleteShopById,
)

export const shopRouter = router
