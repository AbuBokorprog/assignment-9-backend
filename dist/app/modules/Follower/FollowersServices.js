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
const http_status_1 = __importDefault(require("http-status"));
const prisma_1 = __importDefault(require("../../helpers/prisma"));
const AppError_1 = require("../../utils/AppError");
const FollowShop = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistUser = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: payload.customerId,
            status: 'ACTIVE',
        },
    });
    const isExistShop = yield prisma_1.default.shop.findUniqueOrThrow({
        where: {
            id: payload.shopId,
        },
    });
    const isAlreadyFollow = yield prisma_1.default.follower.findFirst({
        where: {
            customerId: payload.customerId,
            shopId: payload.shopId,
        },
    });
    if (isAlreadyFollow) {
        throw new AppError_1.AppError(http_status_1.default.OK, 'Already following the shop!');
    }
    const follower = yield prisma_1.default.follower.create({
        data: payload,
    });
    return follower;
});
const unFollowShop = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistUser = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: payload.customerId,
            status: 'ACTIVE',
        },
    });
    const isExistShop = yield prisma_1.default.shop.findUniqueOrThrow({
        where: {
            id: payload.shopId,
        },
    });
    const isAlreadyFollow = yield prisma_1.default.follower.findFirst({
        where: {
            customerId: payload.customerId,
            shopId: payload.shopId,
        },
    });
    if (!isAlreadyFollow) {
        throw new AppError_1.AppError(http_status_1.default.OK, "You're not following the shop!");
    }
    const unfollow = yield prisma_1.default.follower.deleteMany({
        where: {
            customerId: payload.customerId,
            shopId: payload.shopId,
        },
    });
    return unfollow;
});
// const retrieveAllFollower = async () => {
//   const result = await prisma.follower.findMany({})
//   return result
// }
// const retrieveFollowerById = async (id: any) => {
//   const result = await prisma.follower.findUniqueOrThrow({
//     where: {
//       id: id,
//     },
//   })
//   return result
// }
// const updateFollowerById = async (id: string, payload: any) => {
//   await prisma.follower.findUniqueOrThrow({
//     where: {
//       id: id,
//     },
//   })
//   const result = await prisma.follower.update({
//     where: {
//       id: id,
//     },
//     data: payload,
//   })
//   return result
// }
// const deleteFollowerById = async (id: string) => {
//   await prisma.follower.findUniqueOrThrow({
//     where: {
//       id: id,
//     },
//   })
//   const result = await prisma.follower.delete({
//     where: {
//       id: id,
//     },
//   })
//   return result
// }
exports.followerServices = {
    FollowShop,
    unFollowShop,
    // retrieveAllFollower,
    // retrieveFollowerById,
    // updateFollowerById,
    // deleteFollowerById,
};
