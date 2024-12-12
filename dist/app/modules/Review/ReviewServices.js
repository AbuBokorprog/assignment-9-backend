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
exports.reviewServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const prisma_1 = __importDefault(require("../../helpers/prisma"));
const AppError_1 = require("../../utils/AppError");
const createReview = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: user === null || user === void 0 ? void 0 : user.id,
        },
    });
    const isExistProduct = yield prisma_1.default.product.findUniqueOrThrow({
        where: {
            id: payload.productId,
            isActive: 'APPROVED',
        },
        include: {
            orders: {
                include: {
                    order: {
                        select: {
                            customerId: true,
                        },
                    },
                },
            },
        },
    });
    payload.shopId = isExistProduct.shopId;
    const isOrderedProduct = (_a = isExistProduct === null || isExistProduct === void 0 ? void 0 : isExistProduct.orders) === null || _a === void 0 ? void 0 : _a.some(item => item.order.customerId === (user === null || user === void 0 ? void 0 : user.id));
    if (!isOrderedProduct) {
        throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'Before giving review order this product.');
    }
    const review = yield prisma_1.default.review.create({
        data: {
            customerId: user === null || user === void 0 ? void 0 : user.id,
            productId: payload.productId,
            shopId: payload.shopId,
            rating: payload.rating,
            comment: payload.comment,
        },
    });
    return review;
});
const retrieveAllReview = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.review.findMany({
        include: {
            product: true,
            shop: true,
            customer: true,
        },
    });
    return result;
});
const retrieveAllMyReview = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: user.email,
            status: 'ACTIVE',
        },
    });
    const result = yield prisma_1.default.review.findMany({
        where: {
            customerId: userData.id,
        },
        include: {
            product: true,
            shop: true,
            customer: true,
        },
    });
    return result;
});
const retrieveVendorAllReview = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: user.email,
            status: 'ACTIVE',
        },
    });
    const isExistVendor = yield prisma_1.default.vendor.findUniqueOrThrow({
        where: {
            email: userData.email,
        },
    });
    const result = yield prisma_1.default.review.findMany({
        where: {
            shop: {
                vendorId: isExistVendor.id,
            },
        },
        include: {
            product: true,
            shop: true,
            customer: true,
        },
    });
    return result;
});
const retrieveReviewById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.review.findUniqueOrThrow({
        where: {
            id: id,
        },
        include: {
            product: true,
            shop: true,
            customer: true,
        },
    });
    return result;
});
const updateReviewById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.review.findUniqueOrThrow({
        where: {
            id: id,
        },
    });
    const result = yield prisma_1.default.review.update({
        where: {
            id: id,
        },
        data: payload,
    });
    return result;
});
const deleteReviewById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.review.findUniqueOrThrow({
        where: {
            id: id,
        },
    });
    const result = yield prisma_1.default.review.delete({
        where: {
            id: id,
        },
    });
    return result;
});
exports.reviewServices = {
    createReview,
    retrieveAllReview,
    retrieveReviewById,
    updateReviewById,
    deleteReviewById,
    retrieveAllMyReview,
};
