"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const ValidationRequest_1 = __importDefault(require("../../utils/ValidationRequest"));
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
router.post('/create-admin', (0, ValidationRequest_1.default)(user_validation_1.userValidation.createAdmin), user_controller_1.userControllers.createAdmin);
router.post('/create-vendor', (0, ValidationRequest_1.default)(user_validation_1.userValidation.createAdmin), user_controller_1.userControllers.createVendor);
router.post('/create-customer', (0, ValidationRequest_1.default)(user_validation_1.userValidation.createAdmin), user_controller_1.userControllers.createCustomer);
exports.userRouter = router;
