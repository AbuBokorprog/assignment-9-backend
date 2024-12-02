"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartRouter = void 0;
const express_1 = __importDefault(require("express"));
const ValidationRequest_1 = __importDefault(require("../../utils/ValidationRequest"));
const CartsValidation_1 = require("./CartsValidation");
const CartsController_1 = require("./CartsController");
const router = express_1.default.Router();
router.post('/', (0, ValidationRequest_1.default)(CartsValidation_1.cartValidation.createCart), CartsController_1.cartsController.createCart);
router.get('/', CartsController_1.cartsController.retrieveCart);
router.get('/:id', CartsController_1.cartsController.retrieveCartById);
router.patch('/:id', CartsController_1.cartsController.updateCart);
router.delete('/:id', CartsController_1.cartsController.deleteCart);
exports.cartRouter = router;
