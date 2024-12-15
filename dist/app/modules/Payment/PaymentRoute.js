"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRoute = void 0;
const express_1 = __importDefault(require("express"));
const PaymentController_1 = require("./PaymentController");
const Auth_1 = __importDefault(require("../../middlewares/Auth"));
const client_1 = require("@prisma/client");
const route = express_1.default.Router();
route.post('/success-payment', PaymentController_1.paymentController.confirmationController);
route.post('/failed-payment', PaymentController_1.paymentController.PaymentFailed);
route.patch('/update/payment-status', (0, Auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.SUPER_ADMIN, client_1.UserRole.VENDOR), PaymentController_1.paymentController.updateStatus);
exports.paymentRoute = route;
