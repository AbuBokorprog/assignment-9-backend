"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shopValidation = void 0;
const zod_1 = require("zod");
const createShop = zod_1.z.object({
    shopName: zod_1.z.string({ required_error: 'Enter unique shop name.' }),
    shopLogo: zod_1.z.string({ required_error: 'Enter shop logo.' }),
    description: zod_1.z.string().optional(),
    vendorId: zod_1.z.string({ required_error: 'Enter valid vendor id.' }),
});
exports.shopValidation = { createShop };
