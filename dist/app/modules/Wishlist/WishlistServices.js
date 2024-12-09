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
exports.wishlistServices = void 0;
const prisma_1 = __importDefault(require("../../helpers/prisma"));
const createWishlist = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: user === null || user === void 0 ? void 0 : user.email,
        },
    });
    const isAlreadyExist = yield prisma_1.default.wishlist.findFirst({
        where: {
            userId: userData.id,
            productId: payload.productId,
        },
    });
    if (isAlreadyExist) {
        return;
    }
    else {
        const wishlist = yield prisma_1.default.wishlist.create({
            data: {
                userId: userData.id,
                productId: payload.productId,
            },
        });
        return wishlist;
    }
});
const retrieveAllMyWishlist = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: user.email,
            status: 'ACTIVE',
        },
    });
    const result = yield prisma_1.default.wishlist.findMany({
        where: {
            userId: userData.id,
        },
        include: {
            product: true,
            user: true,
        },
    });
    return result;
});
const retrieveWishlistById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.wishlist.findUniqueOrThrow({
        where: {
            id: id,
        },
    });
    return result;
});
const updateWishlistById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.wishlist.findUniqueOrThrow({
        where: {
            id: id,
        },
    });
    const result = yield prisma_1.default.wishlist.update({
        where: {
            id: id,
        },
        data: payload,
    });
    return result;
});
const deleteWishlistById = (user, productId) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistProduct = yield prisma_1.default.wishlist.findFirstOrThrow({
        where: {
            productId: productId,
            userId: user.id,
        },
    });
    const result = yield prisma_1.default.wishlist.delete({
        where: {
            id: isExistProduct.id,
        },
    });
    return result;
});
exports.wishlistServices = {
    createWishlist,
    retrieveAllMyWishlist,
    retrieveWishlistById,
    updateWishlistById,
    deleteWishlistById,
};
