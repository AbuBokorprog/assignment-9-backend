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
exports.ordersService = void 0;
const prisma_1 = __importDefault(require("../../helpers/prisma"));
const createOrder = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: payload.customerId,
        },
    });
    const result = yield prisma_1.default.$transaction((transactionalClient) => __awaiter(void 0, void 0, void 0, function* () {
        const orderData = yield transactionalClient.order.create({
            data: {
                customerId: payload.customerId,
                totalAmount: payload.totalAmount,
            },
        });
        yield transactionalClient.productOrder.create({
            data: {
                orderId: orderData.id,
                productId: payload.productId,
                quantity: payload.quantity,
            },
        });
    }));
    return result;
});
const retrieveOrder = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.order.findMany({
        include: {
            products: true,
        },
    });
    return result;
});
const retrieveOrderById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.order.findUniqueOrThrow({
        where: {
            id: id,
        },
        include: {
            products: true,
        },
    });
    return result;
});
// const updateOrder = async (id: string, payload: Partial<TOrder>) => {
//   await prisma.order.findUniqueOrThrow({
//     where: {
//       id: id,
//     },
//   })
//   const result = await prisma.order.update({
//     where: {
//       id: id,
//     },
//     data: payload,
//   })
//   return result
// }
const deleteOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.order.delete({
        where: {
            id: id,
        },
    });
    return result;
});
exports.ordersService = {
    createOrder,
    retrieveOrder,
    retrieveOrderById,
    // updateOrder,
    deleteOrder,
};
