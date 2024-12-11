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
exports.comparisonServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const prisma_1 = __importDefault(require("../../helpers/prisma"));
const AppError_1 = require("../../utils/AppError");
const createComparison = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    // Ensure the user exists
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: user.id,
        },
    });
    // Ensure the product exists
    const productData = yield prisma_1.default.product.findUniqueOrThrow({
        where: { id: payload.productId },
        include: {
            reviews: {
                select: {
                    rating: true,
                },
            },
        },
    });
    const totalReviews = (_a = productData === null || productData === void 0 ? void 0 : productData.reviews) === null || _a === void 0 ? void 0 : _a.length;
    const rating = (_b = productData === null || productData === void 0 ? void 0 : productData.reviews) === null || _b === void 0 ? void 0 : _b.reduce((sum, item) => sum + item.rating, 0);
    const avgRating = totalReviews > 0 ? (rating / totalReviews).toFixed(1) : 0;
    payload.rating = avgRating.toString();
    // Check if the product is already in the comparison list
    const isAlreadyExist = yield prisma_1.default.comparison.findFirst({
        where: {
            productId: payload.productId,
            userId: userData.id,
        },
    });
    if (isAlreadyExist) {
        throw new AppError_1.AppError(http_status_1.default.ALREADY_REPORTED, 'Product is already in the comparison list.');
    }
    // Get all products in the user's comparison list
    const userComparisonProducts = yield prisma_1.default.comparison.findMany({
        where: {
            userId: userData.id,
        },
        include: {
            product: {
                select: {
                    categoryId: true,
                },
            },
        },
    });
    // Check if the user has already added 3 products
    if (userComparisonProducts.length >= 3) {
        throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'You can only compare up to 3 products.');
    }
    // Ensure all products belong to the same category
    const hasDifferentCategory = userComparisonProducts.some(comparison => comparison.product.categoryId !== productData.categoryId);
    if (hasDifferentCategory) {
        throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'All products in the comparison list must belong to the same category.');
    }
    // Add the product to the comparison list
    const comparison = yield prisma_1.default.comparison.create({
        data: {
            userId: userData.id,
            productId: payload.productId,
        },
    });
    return comparison;
});
const retrieveAllMyComparison = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: user.email,
            status: 'ACTIVE',
        },
    });
    const result = yield prisma_1.default.comparison.findMany({
        where: {
            userId: userData.id,
        },
        include: {
            product: {
                select: {
                    images: true,
                    name: true,
                    category: true,
                    regular_price: true,
                    discount_price: true,
                },
                include: {
                    category: true,
                },
            },
        },
    });
    return result;
});
const retrieveComparisonById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.comparison.findUniqueOrThrow({
        where: {
            id: id,
        },
    });
    return result;
});
const updateComparisonById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.comparison.findUniqueOrThrow({
        where: {
            id: id,
        },
    });
    const result = yield prisma_1.default.comparison.update({
        where: {
            id: id,
        },
        data: payload,
    });
    return result;
});
const deleteComparisonById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.comparison.findUniqueOrThrow({
        where: {
            id: id,
        },
    });
    const result = yield prisma_1.default.comparison.delete({
        where: {
            id: id,
        },
    });
    return result;
});
exports.comparisonServices = {
    createComparison,
    retrieveAllMyComparison,
    retrieveComparisonById,
    updateComparisonById,
    deleteComparisonById,
};
