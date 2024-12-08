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
exports.comparisonServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const prisma_1 = __importDefault(require("../../helpers/prisma"));
const AppError_1 = require("../../utils/AppError");
const createComparison = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: user === null || user === void 0 ? void 0 : user.email,
        },
    });
    const isAlreadyExist = yield prisma_1.default.comparison.findFirst({
        where: {
            productId: payload.productId,
            userId: userData.id,
        },
    });
    const usersCompare = yield prisma_1.default.comparison.findMany({
        where: {
            userId: userData.id,
        },
    });
    if (isAlreadyExist || (usersCompare === null || usersCompare === void 0 ? void 0 : usersCompare.length) > 3) {
        throw new AppError_1.AppError(http_status_1.default.ALREADY_REPORTED, 'Already exist!');
    }
    else {
        const comparison = yield prisma_1.default.comparison.create({
            data: {
                userId: userData.id,
                productId: payload.productId,
            },
        });
        return comparison;
    }
});
const retrieveAllMyComparison = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: user.email,
            status: 'ACTIVE',
        },
    });
    const result = yield prisma_1.default.comparison.findMany({
        where: {
            userId: userData.id,
        },
    });
    return result;
});
const retrieveComparisonById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.comparison.findUniqueOrThrow({
        where: {
            id: id,
        },
    });
    return result;
});
const updateComparisonById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.comparison.findUniqueOrThrow({
        where: {
            id: id,
        },
    });
    const result = yield prisma_1.default.comparison.update({
        where: {
            id: id,
        },
        data: payload,
    });
    return result;
});
const deleteComparisonById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.comparison.findUniqueOrThrow({
        where: {
            id: id,
        },
    });
    const result = yield prisma_1.default.comparison.delete({
        where: {
            id: id,
        },
    });
    return result;
});
exports.comparisonServices = {
    createComparison,
    retrieveAllMyComparison,
    retrieveComparisonById,
    updateComparisonById,
    deleteComparisonById,
};
