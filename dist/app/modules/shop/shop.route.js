"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shopRouter = void 0;
const express_1 = __importDefault(require("express"));
const shop_controller_1 = require("./shop.controller");
const ValidationRequest_1 = __importDefault(require("../../utils/ValidationRequest"));
const shop_validation_1 = require("./shop.validation");
const router = express_1.default.Router();
router.post('/', (0, ValidationRequest_1.default)(shop_validation_1.shopValidation.createShop), shop_controller_1.shopController.createShop);
router.get('/', shop_controller_1.shopController.retrieveAllShop);
router.get('/:id', shop_controller_1.shopController.retrieveShopById);
router.patch('/:id', shop_controller_1.shopController.updateShopById);
router.delete('/:id', shop_controller_1.shopController.deleteShopById);
exports.shopRouter = router;
