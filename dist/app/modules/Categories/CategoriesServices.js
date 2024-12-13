"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryServices = void 0;
const prisma_1 = __importDefault(require("../../helpers/prisma"));
const ImageUpload_1 = require("../../utils/ImageUpload");
const createCategory = (file, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (file) {
        const path = file.path;
        const response = yield (0, ImageUpload_1.ImageUpload)(payload.name, path);
        const secureUrl = response.secure_url;
        payload.image = secureUrl;
        const data = {
            name: payload.name,
            image: secureUrl,
            description: payload.description || null,
        };
        const category = yield prisma_1.default.category.create({
            data: data,
        });
        return category;
    }
});
const retrieveAllCategory = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.category.findMany({});
    return result;
});
const retrieveCategoryById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.category.findUniqueOrThrow({
        where: {
            id: id,
        },
    });
    return result;
});
const updateCategoryById = (file, id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.category.findUniqueOrThrow({
        where: {
            id: id,
        },
    });
    if (file) {
        const path = file.path;
        const response = yield (0, ImageUpload_1.ImageUpload)(payload.name, path);
        const secureUrl = response.secure_url;
        payload.image = secureUrl;
    }
    const result = yield prisma_1.default.category.update({
        where: {
            id: id,
        },
        data: payload,
    });
    return result;
});
const deleteCategoryById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.category.findUniqueOrThrow({
        where: {
            id: id,
        },
    });
    const result = yield prisma_1.default.category.delete({
        where: {
            id: id,
        },
    });
    return result;
});
exports.categoryServices = {
    createCategory,
    retrieveAllCategory,
    retrieveCategoryById,
    updateCategoryById,
    deleteCategoryById,
};
