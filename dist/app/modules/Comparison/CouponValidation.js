"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.couponValidation = void 0;
const zod_1 = require("zod");
const createCoupon = zod_1.z.object({
    name: zod_1.z.string({ required_error: 'Name is required.' }),
    code: zod_1.z
        .string({ required_error: 'Code is required.' })
        .regex(/^[A-Z0-9]+$/, 'Code must be alphanumeric and uppercase.'),
    discount: zod_1.z.number().positive('Discount must be a positive number.'),
    expiryDate: zod_1.z.string(),
});
exports.couponValidation = { createCoupon };
