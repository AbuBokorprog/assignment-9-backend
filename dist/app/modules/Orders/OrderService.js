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
const PaymentUtils_1 = require("../Payment/PaymentUtils");
const createOrder = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // check is user exist
    yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: user.id,
        },
    });
    payload.customerId = user.id;
    // create order
    const result = yield prisma_1.default.$transaction((transactionalClient) => __awaiter(void 0, void 0, void 0, function* () {
        // create order
        const orderData = yield transactionalClient.order.create({
            data: {
                customerId: payload.customerId,
                fullName: payload.fullName,
                phoneNumber: payload.phoneNumber,
                email: payload.email,
                city: payload.city,
                deliveryAddress: payload.deliveryAddress,
                deliveryArea: payload.deliveryArea === '60' ? 'Inside Dhaka' : 'Outside Dhaka',
                postalCode: Number(payload.postalCode),
                quantity: Number(payload.quantity),
                totalAmount: payload.totalAmount,
                paymentType: payload.paymentType,
                deliveryCharge: Number(payload.deliveryArea),
            },
        });
        // Create product orders
        yield Promise.all(payload.products.map((product) => __awaiter(void 0, void 0, void 0, function* () {
            yield transactionalClient.productOrder.create({
                data: {
                    orderId: orderData.id,
                    productId: product.productId,
                    price: product.price,
                    size: product.size || null, // Handle optional fields
                    color: product.color || null, // Handle optional fields
                    quantity: product.quantity,
                },
            });
        })));
        // create transactionId for payment
        const transactionId = `BB-${orderData.id}-${payload.totalAmount}`;
        let payment = null;
        // if payment type Advanced payment(ADV) create payment
        if (payload.paymentType === 'ADV') {
            yield transactionalClient.payment.create({
                data: {
                    orderId: orderData.id,
                    amount: payload.totalAmount,
                    paymentMethod: payload.paymentType,
                    transactionId: transactionId,
                },
            });
            // payment utilize
            payment = yield (0, PaymentUtils_1.PaymentUtils)(payload, transactionId);
        }
        // after order created, cart will be deleted.
        yield transactionalClient.cart.deleteMany({
            where: {
                customerId: payload.customerId,
            },
        });
        return {
            orderData,
            payment,
        };
    }));
    return result;
});
const retrieveOrder = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.order.findMany({
        include: {
            payment: true,
            customer: {
                include: {
                    customer: true,
                },
            },
            products: {
                include: {
                    product: true,
                },
            },
        },
    });
    return result;
});
const retrieveMyOrders = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: user === null || user === void 0 ? void 0 : user.email,
            status: 'ACTIVE',
        },
    });
    const result = yield prisma_1.default.order.findMany({
        where: {
            customerId: userData.id,
        },
        include: {
            products: {
                include: {
                    product: true,
                },
            },
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
const updateOrder = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.order.findUniqueOrThrow({
        where: {
            id: id,
        },
    });
    const result = yield prisma_1.default.order.update({
        where: {
            id: id,
        },
        data: payload,
    });
    return result;
});
const deleteOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.order.delete({
        where: {
            id: id,
        },
    });
    return result;
});
const updateStatus = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistOrder = yield prisma_1.default.order.findUniqueOrThrow({
        where: {
            id: id,
        },
    });
    const result = yield prisma_1.default.order.update({
        where: {
            id: isExistOrder.id,
        },
        data: {
            status: status,
        },
    });
    return result;
});
exports.ordersService = {
    createOrder,
    retrieveOrder,
    retrieveOrderById,
    updateOrder,
    retrieveMyOrders,
    updateStatus,
    deleteOrder,
};
