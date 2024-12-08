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
exports.wishlistController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const SuccessResponse_1 = __importDefault(require("../../utils/SuccessResponse"));
const CatchAsync_1 = __importDefault(require("../../utils/CatchAsync"));
const WishlistServices_1 = require("./WishlistServices");
const createWishlist = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield WishlistServices_1.wishlistServices.createWishlist(req.user, req.body);
    (0, SuccessResponse_1.default)(res, {
        status: http_status_1.default.CREATED,
        success: true,
        message: 'Create wishlist successfully!',
        data,
    });
}));
const retrieveAllWishlist = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield WishlistServices_1.wishlistServices.retrieveAllMyWishlist(req === null || req === void 0 ? void 0 : req.user);
    (0, SuccessResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: 'Retrieve all wishlist successfully!',
        data,
    });
}));
const retrieveWishlistById = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = yield WishlistServices_1.wishlistServices.retrieveWishlistById(id);
    (0, SuccessResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: 'Retrieve wishlist by id successfully!',
        data,
    });
}));
const updateWishlistById = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = yield WishlistServices_1.wishlistServices.updateWishlistById(id, req.body);
    (0, SuccessResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: 'Update wishlist by id successfully!',
        data,
    });
}));
const deleteWishlistById = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield WishlistServices_1.wishlistServices.deleteWishlistById(req.user, req.body);
    (0, SuccessResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: 'Delete wishlist by id successfully!',
        data,
    });
}));
exports.wishlistController = {
    createWishlist,
    retrieveAllWishlist,
    retrieveWishlistById,
    updateWishlistById,
    deleteWishlistById,
};
