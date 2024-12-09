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
const FollowShop = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: user === null || user === void 0 ? void 0 : user.id,
            status: 'ACTIVE',
        },
    });
    yield prisma_1.default.shop.findUniqueOrThrow({
        where: {
            id: payload.shopId,
        },
    });
    const isAlreadyFollow = yield prisma_1.default.follower.findFirst({
        where: {
            customerId: user === null || user === void 0 ? void 0 : user.id,
            shopId: payload.shopId,
        },
    });
    if (isAlreadyFollow) {
        // If already following, unfollow
        yield prisma_1.default.follower.delete({
            where: {
                id: isAlreadyFollow.id,
            },
        });
        return {
            status: 'unfollowed',
            shopId: payload.shopId,
            customerId: user === null || user === void 0 ? void 0 : user.id,
        };
    }
    else {
        // If not following, follow
        yield prisma_1.default.follower.create({
            data: {
                customerId: user === null || user === void 0 ? void 0 : user.id,
                shopId: payload.shopId,
            },
        });
        return { status: 'followed', shopId: payload.shopId, customerId: user === null || user === void 0 ? void 0 : user.id };
    }
});
const retrieveMyFollowingShop = (user) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: user === null || user === void 0 ? void 0 : user.id,
        },
    });
    const result = yield prisma_1.default.follower.findMany({
        where: {
            customerId: user === null || user === void 0 ? void 0 : user.id,
        },
        include: {
            shop: {
                include: {
                    category: true,
                    vendor: true,
                },
            },
        },
    });
    return result;
});
exports.followerServices = {
    FollowShop,
    retrieveMyFollowingShop,
};
