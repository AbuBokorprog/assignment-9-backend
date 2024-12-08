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
const ImageUpload_1 = require("../../utils/ImageUpload");
const Auth_1 = __importDefault(require("../../middlewares/Auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.post('/', (0, Auth_1.default)(client_1.UserRole.VENDOR), ImageUpload_1.upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'cover', maxCount: 1 },
]), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, ValidationRequest_1.default)(shop_validation_1.shopValidation.createShop), shop_controller_1.shopController.createShop);
router.get('/', shop_controller_1.shopController.retrieveAllShop);
router.get('/vendor-shops', (0, Auth_1.default)(client_1.UserRole.VENDOR), shop_controller_1.shopController.retrieveAllShopByVendor);
router.get('/:id', shop_controller_1.shopController.retrieveShopById);
router.patch('/:id', (0, Auth_1.default)(client_1.UserRole.VENDOR), shop_controller_1.shopController.updateShopById);
router.patch('/status/update-status', (0, Auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.SUPER_ADMIN), shop_controller_1.shopController.updateStatus);
router.delete('/:id', (0, Auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.VENDOR, client_1.UserRole.SUPER_ADMIN), shop_controller_1.shopController.deleteShopById);
exports.shopRouter = router;
