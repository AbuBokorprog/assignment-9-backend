"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidation = void 0;
const zod_1 = require("zod");
const createOrder = zod_1.z.object({
    quantity: zod_1.z.number({ required_error: 'Quantity is required!' }),
    totalAmount: zod_1.z.number({ required_error: 'TotalAmount is required!' }),
});
exports.orderValidation = { createOrder };
