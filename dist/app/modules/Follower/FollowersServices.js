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
exports.followerServices = void 0;
const prisma_1 = __importDefault(require("../../helpers/prisma"));
const createFollower = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const follower = yield prisma_1.default.follower.create({
        data: payload,
    });
    return follower;
});
const retrieveAllFollower = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.follower.findMany({});
    return result;
});
const retrieveFollowerById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.follower.findUniqueOrThrow({
        where: {
            id: id,
        },
    });
    return result;
});
const updateFollowerById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.follower.findUniqueOrThrow({
        where: {
            id: id,
        },
    });
    const result = yield prisma_1.default.follower.update({
        where: {
            id: id,
        },
        data: payload,
    });
    return result;
});
const deleteFollowerById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.follower.findUniqueOrThrow({
        where: {
            id: id,
        },
    });
    const result = yield prisma_1.default.follower.delete({
        where: {
            id: id,
        },
    });
    return result;
});
exports.followerServices = {
    createFollower,
    retrieveAllFollower,
    retrieveFollowerById,
    updateFollowerById,
    deleteFollowerById,
};
