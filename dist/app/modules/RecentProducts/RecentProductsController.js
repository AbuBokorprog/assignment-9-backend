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
exports.recentProductsController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const SuccessResponse_1 = __importDefault(require("../../utils/SuccessResponse"));
const CatchAsync_1 = __importDefault(require("../../utils/CatchAsync"));
const RecentProductsService_1 = require("./RecentProductsService");
const createRecentProducts = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield RecentProductsService_1.RecentProductsServices.createRecentProducts(req.user, req.body);
    (0, SuccessResponse_1.default)(res, {
        status: http_status_1.default.CREATED,
        success: true,
        message: 'Create recentProducts successfully!',
        data,
    });
}));
const retrieveAllRecentProducts = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield RecentProductsService_1.RecentProductsServices.retrieveAllRecentProducts();
    (0, SuccessResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: 'Retrieve all recent Products successfully!',
        data,
    });
}));
const retrieveMyAllRecentProducts = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield RecentProductsService_1.RecentProductsServices.retrieveMyAllRecentProducts(req === null || req === void 0 ? void 0 : req.user);
    (0, SuccessResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: 'Retrieve all my recent Products successfully!',
        data,
    });
}));
const retrieveRecentProductsById = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = yield RecentProductsService_1.RecentProductsServices.retrieveRecentProductsById(id);
    (0, SuccessResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: 'Retrieve recentProducts by id successfully!',
        data,
    });
}));
const updateRecentProductsById = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = yield RecentProductsService_1.RecentProductsServices.updateRecentProductsById(id, req.body);
    (0, SuccessResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: 'Update recentProducts by id successfully!',
        data,
    });
}));
const deleteRecentProductsById = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = yield RecentProductsService_1.RecentProductsServices.deleteRecentProductsById(id);
    (0, SuccessResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: 'Delete recentProducts by id successfully!',
        data,
    });
}));
exports.recentProductsController = {
    createRecentProducts,
    retrieveAllRecentProducts,
    retrieveRecentProductsById,
    updateRecentProductsById,
    deleteRecentProductsById,
    retrieveMyAllRecentProducts,
};
