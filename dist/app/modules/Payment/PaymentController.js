"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentController = void 0;
const CatchAsync_1 = __importDefault(require("../../utils/CatchAsync"));
const PaymentService_1 = require("./PaymentService");
const SuccessResponse_1 = __importDefault(require("../../utils/SuccessResponse"));
const http_status_1 = __importDefault(require("http-status"));
const confirmationController = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { transactionId } = req.query;
    const result = yield PaymentService_1.paymentServices.confirmationService(transactionId);
    res.send(result);
}));
const PaymentFailed = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield PaymentService_1.paymentServices.failedPayment();
    res.send(result);
}));
const updateStatus = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield PaymentService_1.paymentServices.updateStatus(req.body.id, req.body.status);
    (0, SuccessResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: 'Update payment status successfully!',
        data,
    });
}));
exports.paymentController = {
    confirmationController,
    PaymentFailed,
    updateStatus,
};
