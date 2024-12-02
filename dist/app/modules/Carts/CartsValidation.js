"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartValidation = void 0;
const zod_1 = require("zod");
const createCart = zod_1.z.object({
    customerId: zod_1.z.string({ required_error: 'Customer id is required!' }),
    productId: zod_1.z.string({ required_error: 'Product id is required!' }),
});
exports.cartValidation = { createCart };
