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
exports.productController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const SuccessResponse_1 = __importDefault(require("../../utils/SuccessResponse"));
const CatchAsync_1 = __importDefault(require("../../utils/CatchAsync"));
const ProductsServices_1 = require("./ProductsServices");
const Pick_1 = __importDefault(require("../../helpers/Pick"));
const ProductsContaints_1 = require("./ProductsContaints");
const createProduct = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield ProductsServices_1.productServices.createProduct(req.files, req.body);
    (0, SuccessResponse_1.default)(res, {
        status: http_status_1.default.CREATED,
        success: true,
        message: 'Create product successfully!',
        data,
    });
}));
const retrieveAllProduct = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // pick
    const filterFields = (0, Pick_1.default)(req.query, ProductsContaints_1.adminFilterableFields);
    // pagination pick
    const paginationOption = (0, Pick_1.default)(req.query, [
        'limit',
        'page',
        'sortBy',
        'sortOrder',
    ]);
    const data = yield ProductsServices_1.productServices.retrieveAllProduct(filterFields, paginationOption);
    (0, SuccessResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: 'Retrieve all products successfully!',
        data,
    });
}));
const retrieveAllProductByVendor = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield ProductsServices_1.productServices.retrieveAllProductByVendor(req === null || req === void 0 ? void 0 : req.user);
    (0, SuccessResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: 'Retrieve all products successfully!',
        data,
    });
}));
const retrieveProductById = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = yield ProductsServices_1.productServices.retrieveProductById(id);
    (0, SuccessResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: 'Retrieve product by id successfully!',
        data,
    });
}));
const updateProductById = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = yield ProductsServices_1.productServices.updateProductById(id, req.body);
    (0, SuccessResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: 'Update product by id successfully!',
        data,
    });
}));
const updateProductStatusId = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield ProductsServices_1.productServices.updateProductStatusId(req.body.id, req.body.status);
    (0, SuccessResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: 'Update product status by id successfully!',
        data,
    });
}));
const deleteProductById = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = yield ProductsServices_1.productServices.deleteProductById(id);
    (0, SuccessResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: 'Delete product by id successfully!',
        data,
    });
}));
exports.productController = {
    createProduct,
    retrieveAllProduct,
    retrieveProductById,
    updateProductById,
    deleteProductById,
    retrieveAllProductByVendor,
    updateProductStatusId,
};
