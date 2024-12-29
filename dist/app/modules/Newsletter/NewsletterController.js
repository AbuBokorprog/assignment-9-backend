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
exports.newsletterController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const CatchAsync_1 = __importDefault(require("../../utils/CatchAsync"));
const SuccessResponse_1 = __importDefault(require("../../utils/SuccessResponse"));
const NewsletterServices_1 = require("./NewsletterServices");
const subscribeNewsletter = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield NewsletterServices_1.newsletterServices.subscribeNewsletter(req.body);
    (0, SuccessResponse_1.default)(res, {
        success: true,
        status: http_status_1.default.OK,
        message: 'Subscribe successfully!',
        data,
    });
}));
const retrieveAllSubscriber = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield NewsletterServices_1.newsletterServices.retrieveAllSubscriber();
    (0, SuccessResponse_1.default)(res, {
        success: true,
        status: http_status_1.default.OK,
        message: 'Retrieve newsletters!',
        data,
    });
}));
exports.newsletterController = {
    subscribeNewsletter,
    retrieveAllSubscriber,
};
