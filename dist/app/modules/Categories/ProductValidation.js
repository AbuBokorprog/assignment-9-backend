"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidation = void 0;
const zod_1 = require("zod");
const CreateProductSchema = zod_1.z.object({
    name: zod_1.z.string({ required_error: 'Name is required.' }),
    price: zod_1.z.number().positive('Price must be a positive number.'),
    description: zod_1.z.string().optional(),
    categoryId: zod_1.z.string({ required_error: 'Category ID is required.' }),
    vendorId: zod_1.z.string({ required_error: 'Vendor ID is required.' }),
    shopId: zod_1.z.string({ required_error: 'Shop ID is required.' }),
    images: zod_1.z.string().url('Images must be a valid URL.').optional(),
    inventory: zod_1.z
        .number()
        .int()
        .nonnegative('Inventory must be a non-negative integer.'),
    discount: zod_1.z
        .number()
        .positive('Discount must be a positive number.')
        .optional(),
});
exports.productValidation = { CreateProductSchema };
