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
exports.cartsService = void 0;
const prisma_1 = __importDefault(require("../../helpers/prisma"));
const createCart = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: user === null || user === void 0 ? void 0 : user.email,
        },
    });
    payload.customerId = userData === null || userData === void 0 ? void 0 : userData.id;
    yield prisma_1.default.product.findUniqueOrThrow({
        where: {
            id: payload.productId,
        },
    });
    const isAlreadyExist = yield prisma_1.default.cart.findFirst({
        where: {
            customerId: userData === null || userData === void 0 ? void 0 : userData.id,
            productId: payload.productId,
        },
    });
    if (isAlreadyExist) {
        const result = yield prisma_1.default.cart.update({
            where: {
                id: isAlreadyExist.id,
            },
            data: {
                color: payload.color,
                size: payload.size,
                price: payload.price,
                productId: payload.productId,
                qty: isAlreadyExist.qty + 1,
            },
        });
        return result;
    }
    else {
        const result = yield prisma_1.default.cart.create({
            data: payload,
        });
        return result;
    }
});
const retrieveCart = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.cart.findMany({
        include: {
            product: true,
        },
    });
    return result;
});
const retrieveMyCart = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: user === null || user === void 0 ? void 0 : user.email,
            status: 'ACTIVE',
        },
    });
    const result = yield prisma_1.default.cart.findMany({
        where: {
            customerId: userData === null || userData === void 0 ? void 0 : userData.id,
        },
        include: {
            product: true,
        },
    });
    return result;
});
const retrieveCartById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.cart.findUniqueOrThrow({
        where: {
            id: id,
        },
        include: {
            product: true,
        },
    });
    return result;
});
const updateCart = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.cart.findUniqueOrThrow({
        where: {
            id: id,
        },
    });
    const result = yield prisma_1.default.cart.update({
        where: {
            id: id,
        },
        data: payload,
    });
    return result;
});
const deleteCart = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.cart.delete({
        where: {
            id: id,
        },
    });
    return result;
});
exports.cartsService = {
    createCart,
    retrieveCart,
    retrieveCartById,
    updateCart,
    deleteCart,
    retrieveMyCart,
};
