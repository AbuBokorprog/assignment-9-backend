"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = __importDefault(require("express"));
const ValidationRequest_1 = __importDefault(require("../../utils/ValidationRequest"));
const ProductsController_1 = require("./ProductsController");
const ProductValidation_1 = require("./ProductValidation");
const ImageUpload_1 = require("../../utils/ImageUpload");
const Auth_1 = __importDefault(require("../../middlewares/Auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.post('/', ImageUpload_1.upload.array('files[]'), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    console.log(req.files);
    next();
}, (0, Auth_1.default)(client_1.UserRole.VENDOR), (0, ValidationRequest_1.default)(ProductValidation_1.productValidation.CreateProductSchema), ProductsController_1.productController.createProduct);
router.get('/', ProductsController_1.productController.retrieveAllProduct);
router.get('/all-products/available', ProductsController_1.productController.allAvailableProducts);
router.get('/all-products/flash-sale', ProductsController_1.productController.allFlashSaleProducts);
router.get('/vendor/my-product', (0, Auth_1.default)(client_1.UserRole.VENDOR), ProductsController_1.productController.retrieveAllProductByVendor);
router.get('/:id', ProductsController_1.productController.retrieveProductById);
router.patch('/:id', ProductsController_1.productController.updateProductById);
router.patch('/status/update-status', (0, Auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.SUPER_ADMIN), ProductsController_1.productController.updateProductStatusId);
router.delete('/:id', ProductsController_1.productController.deleteProductById);
exports.productRouter = router;
