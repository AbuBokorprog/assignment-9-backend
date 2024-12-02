"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryValidation = void 0;
const zod_1 = require("zod");
const CreateCategorySchema = zod_1.z.object({
    name: zod_1.z.string({ required_error: 'Name is required.' }),
    description: zod_1.z.string().optional(),
    image: zod_1.z.string().url('Images must be a valid URL.').optional(),
});
exports.categoryValidation = { CreateCategorySchema };
