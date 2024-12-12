"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewValidation = void 0;
const zod_1 = require("zod");
const createReview = zod_1.z.object({
    // customerId: z.string({ required_error: 'Customer ID is required.' }),
    productId: zod_1.z.string({ required_error: 'Product ID is required.' }),
    rating: zod_1.z
        .number()
        .min(1, 'Rating must be at least 1.')
        .max(5, 'Rating cannot be more than 5.'),
    comment: zod_1.z.string().optional(),
});
exports.reviewValidation = { createReview };
