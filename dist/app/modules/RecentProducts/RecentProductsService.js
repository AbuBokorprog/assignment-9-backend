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
exports.RecentProductsServices = void 0;
const prisma_1 = __importDefault(require("../../helpers/prisma"));
const createRecentProducts = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const recentProduct = yield prisma_1.default.recentProduct.create({
        data: payload,
    });
    return recentProduct;
});
const retrieveAllRecentProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.recentProduct.findMany({});
    return result;
});
const retrieveRecentProductsById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.recentProduct.findUniqueOrThrow({
        where: {
            id: id,
        },
    });
    return result;
});
const updateRecentProductsById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.recentProduct.findUniqueOrThrow({
        where: {
            id: id,
        },
    });
    const result = yield prisma_1.default.recentProduct.update({
        where: {
            id: id,
        },
        data: payload,
    });
    return result;
});
const deleteRecentProductsById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.recentProduct.findUniqueOrThrow({
        where: {
            id: id,
        },
    });
    const result = yield prisma_1.default.recentProduct.delete({
        where: {
            id: id,
        },
    });
    return result;
});
exports.RecentProductsServices = {
    createRecentProducts,
    retrieveAllRecentProducts,
    retrieveRecentProductsById,
    updateRecentProductsById,
    deleteRecentProductsById,
};
