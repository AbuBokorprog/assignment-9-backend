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
const AppError_1 = require("../../utils/AppError");
const createCart = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: user === null || user === void 0 ? void 0 : user.email,
        },
    });
    payload.customerId = userData === null || userData === void 0 ? void 0 : userData.id;
    const isExistProduct = yield prisma_1.default.product.findUniqueOrThrow({
        where: {
            id: payload.productId,
        },
    });
    payload.vendorId = isExistProduct.vendorId;
    const isAlreadyExist = yield prisma_1.default.cart.findFirst({
        where: {
            customerId: userData === null || userData === void 0 ? void 0 : userData.id,
            productId: payload.productId,
        },
    });
    if ((isExistProduct === null || isExistProduct === void 0 ? void 0 : isExistProduct.inventory) === 0) {
        throw new AppError_1.AppError(400, 'The product is out of stock!');
    }
    const productInventory = isExistProduct.inventory - 1;
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        if (isAlreadyExist) {
            const result = yield transactionClient.cart.update({
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
            yield transactionClient.product.update({
                where: {
                    id: payload.productId,
                },
                data: {
                    inventory: productInventory,
                    stockStatus: productInventory > 10
                        ? 'IN_STOCK'
                        : productInventory <= 10
                            ? 'LOW_STOCK'
                            : 'OUT_OF_STOCK',
                },
            });
            return result;
        }
        else {
            const result = yield transactionClient.cart.create({
                data: payload,
            });
            yield transactionClient.product.update({
                where: {
                    id: payload.productId,
                },
                data: {
                    inventory: productInventory,
                    stockStatus: productInventory > 10
                        ? 'IN_STOCK'
                        : productInventory <= 10
                            ? 'LOW_STOCK'
                            : 'OUT_OF_STOCK',
                },
            });
            return result;
        }
    }));
    return result;
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
    const isExitCart = yield prisma_1.default.cart.findUniqueOrThrow({
        where: {
            id: id,
        },
    });
    const product = yield prisma_1.default.product.findUniqueOrThrow({
        where: {
            id: isExitCart.productId,
        },
    });
    const productInventory = (product === null || product === void 0 ? void 0 : product.inventory) + isExitCart.qty;
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield transactionClient.cart.delete({
            where: {
                id: id,
            },
        });
        yield transactionClient.product.update({
            where: {
                id: product === null || product === void 0 ? void 0 : product.id,
            },
            data: {
                inventory: productInventory,
            },
        });
        return result;
    }));
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
