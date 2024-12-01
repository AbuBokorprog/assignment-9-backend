import express from 'express'
import { shopController } from './shop.controller'
import ValidationRequest from '../../utils/ValidationRequest'
import { shopValidation } from './shop.validation'
const router = express.Router()

router.post(
  '/',
  ValidationRequest(shopValidation.createShop),
  shopController.createShop,
)
router.get('/', shopController.retrieveAllShop)
router.get('/:id', shopController.retrieveShopById)
router.patch('/:id', shopController.updateShopById)
router.delete('/:id', shopController.deleteShopById)

export const shopRouter = router
