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
exports.followerController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const SuccessResponse_1 = __importDefault(require("../../utils/SuccessResponse"));
const CatchAsync_1 = __importDefault(require("../../utils/CatchAsync"));
const FollowersServices_1 = require("./FollowersServices");
const FollowShop = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield FollowersServices_1.followerServices.FollowShop(req.body);
    (0, SuccessResponse_1.default)(res, {
        status: http_status_1.default.CREATED,
        success: true,
        message: 'Following successfully!',
        data,
    });
}));
const unFollowShop = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield FollowersServices_1.followerServices.unFollowShop(req.body);
    (0, SuccessResponse_1.default)(res, {
        status: http_status_1.default.CREATED,
        success: true,
        message: 'Unfollow the shop successfully!',
        // data,
    });
}));
// const retrieveAllFollower = CatchAsync(async (req, res) => {
//   const data = await followerServices.retrieveAllFollower()
//   SuccessResponse(res, {
//     status: httpStatus.OK,
//     success: true,
//     message: 'Retrieve all followers successfully!',
//     data,
//   })
// })
// const retrieveFollowerById = CatchAsync(async (req, res) => {
//   const { id } = req.params
//   const data = await followerServices.retrieveFollowerById(id)
//   SuccessResponse(res, {
//     status: httpStatus.OK,
//     success: true,
//     message: 'Retrieve follower by id successfully!',
//     data,
//   })
// })
// const updateFollowerById = CatchAsync(async (req, res) => {
//   const { id } = req.params
//   const data = await followerServices.updateFollowerById(id, req.body)
//   SuccessResponse(res, {
//     status: httpStatus.OK,
//     success: true,
//     message: 'Update follower by id successfully!',
//     data,
//   })
// })
// const deleteFollowerById = CatchAsync(async (req, res) => {
//   const { id } = req.params
//   const data = await followerServices.deleteFollowerById(id)
//   SuccessResponse(res, {
//     status: httpStatus.OK,
//     success: true,
//     message: 'Delete follower by id successfully!',
//     data,
//   })
// })
exports.followerController = {
    FollowShop,
    unFollowShop,
    // retrieveAllFollower,
    // retrieveFollowerById,
    // updateFollowerById,
    // deleteFollowerById,
};
