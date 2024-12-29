"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newsletterValidation = void 0;
const zod_1 = require("zod");
const subscribeNewsletter = zod_1.z.object({
    email: zod_1.z.string().email('Valid email is required!'),
});
exports.newsletterValidation = { subscribeNewsletter };
