"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wishlistValidation = void 0;
const zod_1 = require("zod");
const createWishlist = zod_1.z.object({
    productId: zod_1.z.string({ required_error: 'Product ID is required.' }),
});
exports.wishlistValidation = { createWishlist };
