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
exports.paymentServices = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const AppError_1 = require("../../utils/AppError");
const http_status_1 = __importDefault(require("http-status"));
const PaymentUtils_1 = require("./PaymentUtils");
const prisma_1 = __importDefault(require("../../helpers/prisma"));
const confirmationService = (transactionId) => __awaiter(void 0, void 0, void 0, function* () {
    const verifyResponse = yield (0, PaymentUtils_1.verifyPayment)(transactionId);
    //   const isExistRental = await rentals.findOne({ tran_id: transactionId })
    const isExistPayment = yield prisma_1.default.payment.findUniqueOrThrow({
        where: {
            transactionId: transactionId,
        },
    });
    if (!isExistPayment) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'Payment not found!');
    }
    if (verifyResponse && verifyResponse.pay_status === 'Successful') {
        yield prisma_1.default.payment.update({
            where: {
                id: isExistPayment.id,
            },
            data: {
                status: 'PAID',
                paidAt: new Date(),
            },
        });
    }
    // eslint-disable-next-line no-undef
    const filePath = (0, path_1.join)(__dirname, '../../views/payment-successfully.html');
    const template = (0, fs_1.readFileSync)(filePath, 'utf-8');
    return template;
});
const failedPayment = () => __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line no-undef
    const filePath = (0, path_1.join)(__dirname, '../../views/payment-failed.html');
    const template = (0, fs_1.readFileSync)(filePath, 'utf-8');
    return template;
});
const updateStatus = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistOrder = yield prisma_1.default.payment.findUniqueOrThrow({
        where: {
            id: id,
        },
    });
    const result = yield prisma_1.default.payment.update({
        where: {
            id: isExistOrder.id,
        },
        data: {
            status: status,
        },
    });
    return result;
});
exports.paymentServices = {
    confirmationService,
    failedPayment,
    updateStatus,
};
