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
exports.userValidation = { createAdmin };
