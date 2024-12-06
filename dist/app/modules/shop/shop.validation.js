"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shopValidation = void 0;
const zod_1 = require("zod");
const createShop = zod_1.z.object({
    shopName: zod_1.z.string({ required_error: 'Enter unique shop name.' }),
    description: zod_1.z.string().optional(),
    categoryId: zod_1.z.string({ required_error: 'Enter valid category id.' }),
    address: zod_1.z.string({ required_error: 'Enter valid address id.' }),
    registrationNumber: zod_1.z.string({
        required_error: 'Enter valid registration number id.',
    }),
});
exports.shopValidation = { createShop };
