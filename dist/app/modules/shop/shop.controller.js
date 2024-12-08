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
exports.shopController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const CatchAsync_1 = __importDefault(require("../../utils/CatchAsync"));
const SuccessResponse_1 = __importDefault(require("../../utils/SuccessResponse"));
const shop_services_1 = require("./shop.services");
const createShop = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield shop_services_1.shopServices.createShop(req.files, req.body);
    (0, SuccessResponse_1.default)(res, {
        status: http_status_1.default.CREATED,
        success: true,
        message: 'Create shop successfully!',
        data,
    });
}));
const retrieveAllShop = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield shop_services_1.shopServices.retrieveAllShop();
    (0, SuccessResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: 'Retrieve all shops successfully!',
        data,
    });
}));
const retrieveAllShopByVendor = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const data = yield shop_services_1.shopServices.retrieveAllShopByVendor(user);
    (0, SuccessResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: 'Retrieve all shops successfully!',
        data,
    });
}));
const retrieveShopById = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = yield shop_services_1.shopServices.retrieveShopById(id);
    (0, SuccessResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: 'Retrieve shop by id successfully!',
        data,
    });
}));
const updateShopById = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = yield shop_services_1.shopServices.updateShopById(id, req.body);
    (0, SuccessResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: 'Update shop by id successfully!',
        data,
    });
}));
const updateStatus = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield shop_services_1.shopServices.updateShopById(req.body.id, req.body.status);
    (0, SuccessResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: 'Update shop status successfully!',
        data,
    });
}));
const deleteShopById = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = yield shop_services_1.shopServices.deleteShopById(id);
    (0, SuccessResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: 'Delete shop by id successfully!',
        data,
    });
}));
exports.shopController = {
    createShop,
    retrieveAllShop,
    retrieveShopById,
    updateShopById,
    deleteShopById,
    updateStatus,
    retrieveAllShopByVendor,
};
