"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidation = void 0;
const zod_1 = require("zod");
const createOrder = zod_1.z.object({
    customerId: zod_1.z.string({ required_error: 'Customer id is required!' }),
    productId: zod_1.z.string({ required_error: 'ProductId is required!' }),
    quantity: zod_1.z.number({ required_error: 'Quantity is required!' }),
    totalAmount: zod_1.z.number({ required_error: 'TotalAmount is required!' }),
});
exports.orderValidation = { createOrder };
