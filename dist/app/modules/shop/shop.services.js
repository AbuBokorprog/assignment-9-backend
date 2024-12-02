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
exports.shopServices = void 0;
const prisma_1 = __importDefault(require("../../helpers/prisma"));
const createShop = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.vendor.findUniqueOrThrow({
        where: {
            id: payload.vendorId,
        },
    });
    const shop = yield prisma_1.default.shop.create({
        data: payload,
    });
    return shop;
});
const retrieveAllShop = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.shop.findMany({});
    return result;
});
const retrieveShopById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.shop.findUniqueOrThrow({
        where: {
            id: id,
        },
    });
    return result;
});
const updateShopById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.shop.findUniqueOrThrow({
        where: {
            id: id,
        },
    });
    const result = yield prisma_1.default.shop.update({
        where: {
            id: id,
        },
        data: payload,
    });
    return result;
});
const deleteShopById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.shop.findUniqueOrThrow({
        where: {
            id: id,
        },
    });
    const result = yield prisma_1.default.shop.delete({
        where: {
            id: id,
        },
    });
    return result;
});
exports.shopServices = {
    createShop,
    retrieveAllShop,
    retrieveShopById,
    updateShopById,
    deleteShopById,
};
