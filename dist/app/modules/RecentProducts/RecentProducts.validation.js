"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recentProductsValidation = void 0;
const zod_1 = require("zod");
const createRecentValidation = zod_1.z.object({
    userId: zod_1.z.string({ required_error: 'Customer ID is required.' }),
    productId: zod_1.z.string({ required_error: 'Product ID is required.' }),
});
exports.recentProductsValidation = { createRecentValidation };
