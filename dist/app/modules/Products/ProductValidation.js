"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidation = void 0;
const zod_1 = require("zod");
const CreateProductSchema = zod_1.z.object({
    name: zod_1.z.string({ required_error: 'Name is required.' }),
    regular_price: zod_1.z.string().min(2, 'Price must be a positive string.'),
    productStatus: zod_1.z.string(),
    discount_price: zod_1.z
        .string()
        .min(2, 'Discount Price must be a positive string.'),
    description: zod_1.z.string().optional(),
    categoryId: zod_1.z.string({ required_error: 'Category ID is required.' }),
    shopId: zod_1.z.string({ required_error: 'Shop ID is required.' }),
    inventory: zod_1.z.string().min(1, 'Inventory must be a non-negative integer.'),
});
exports.productValidation = { CreateProductSchema };
