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
const router = express_1.default.Router();
router.post('/', (0, ValidationRequest_1.default)(ProductValidation_1.productValidation.CreateProductSchema), ProductsController_1.productController.createProduct);
router.get('/', ProductsController_1.productController.retrieveAllProduct);
router.get('/:id', ProductsController_1.productController.retrieveProductById);
router.patch('/:id', ProductsController_1.productController.updateProductById);
router.delete('/:id', ProductsController_1.productController.deleteProductById);
exports.productRouter = router;
