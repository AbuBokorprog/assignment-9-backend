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
exports.verifyPayment = exports.PaymentUtils = void 0;
const axios_1 = __importDefault(require("axios"));
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = require("../../utils/AppError");
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars, @typescript-eslint/no-explicit-any
const PaymentUtils = (user, transactionId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.post('https://sandbox.aamarpay.com/jsonpost.php', {
            store_id: `aamarpaytest`,
            signature_key: `dbb74894e82415a2f7ff0ec3a97e4183`,
            tran_id: transactionId,
            success_url: `http://localhost:3000/api/payment/success-payment?transactionId=${transactionId}`,
            fail_url: 'http://localhost:3000/api/payment/failed-payment',
            cancel_url: '/',
            amount: user.totalAmount,
            currency: 'BDT',
            desc: 'Merchant Registration Payment',
            cus_name: user.fullName,
            cus_email: user.email,
            cus_add1: user.deliveryAddress,
            cus_add2: 'N/A',
            cus_city: 'N/A',
            cus_state: 'N/A',
            cus_postcode: user === null || user === void 0 ? void 0 : user.postalCode,
            cus_country: 'N/A',
            cus_phone: user.phoneNumber,
            type: 'json',
        });
        //console.log(response);
        return response.data;
    }
    catch (err) {
        throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'Payment initiation failed!');
    }
});
exports.PaymentUtils = PaymentUtils;
const verifyPayment = (tnxId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get('https://sandbox.aamarpay.com/api/v1/trxcheck/request.php', {
            params: {
                store_id: 'aamarpaytest',
                signature_key: 'dbb74894e82415a2f7ff0ec3a97e4183',
                type: 'json',
                request_id: tnxId,
            },
        });
        return response.data;
    }
    catch (err) {
        throw new Error('Payment validation failed!');
    }
});
exports.verifyPayment = verifyPayment;
