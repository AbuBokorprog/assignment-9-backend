"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const createAdmin = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required'),
    email: zod_1.z.string().email('Invalid email format').min(1, 'Email is required'),
    password: zod_1.z.string({ required_error: 'Enter password' }),
    profilePhoto: zod_1.z.string().url().optional(),
    contactNumber: zod_1.z.string().min(1, 'Contact number is required'),
});
const createVendor = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required'),
    email: zod_1.z.string().email('Invalid email format').min(1, 'Email is required'),
    password: zod_1.z.string({ required_error: 'Enter password' }),
    profilePhoto: zod_1.z.string().url().optional(),
    contactNumber: zod_1.z.string().min(1, 'Contact number is required'),
    shopName: zod_1.z.string({ required_error: 'Enter unique shop name.' }),
    description: zod_1.z.string().optional(),
    categoryId: zod_1.z.string({ required_error: 'Enter valid category id.' }),
    address: zod_1.z.string({ required_error: 'Enter valid address id.' }),
    registrationNumber: zod_1.z.string({
        required_error: 'Enter valid registration number id.',
    }),
});
exports.userValidation = { createAdmin, createVendor };
