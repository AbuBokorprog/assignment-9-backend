"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.followerValidation = void 0;
const zod_1 = require("zod");
const createFollower = zod_1.z.object({
    customerId: zod_1.z.string({ required_error: 'Customer ID is required.' }),
    shopId: zod_1.z.string({ required_error: 'Product ID is required.' }),
});
exports.followerValidation = { createFollower };