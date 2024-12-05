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
exports.categoryController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const SuccessResponse_1 = __importDefault(require("../../utils/SuccessResponse"));
const CatchAsync_1 = __importDefault(require("../../utils/CatchAsync"));
const CategoriesServices_1 = require("./CategoriesServices");
const createCategory = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield CategoriesServices_1.categoryServices.createCategory(req.file, req.body);
    (0, SuccessResponse_1.default)(res, {
        status: http_status_1.default.CREATED,
        success: true,
        message: 'Create category successfully!',
        data,
    });
}));
const retrieveAllCategory = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield CategoriesServices_1.categoryServices.retrieveAllCategory();
    (0, SuccessResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: 'Retrieve all categories successfully!',
        data,
    });
}));
const retrieveCategoryById = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = yield CategoriesServices_1.categoryServices.retrieveCategoryById(id);
    (0, SuccessResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: 'Retrieve category by id successfully!',
        data,
    });
}));
const updateCategoryById = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = yield CategoriesServices_1.categoryServices.updateCategoryById(id, req.body);
    (0, SuccessResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: 'Update category by id successfully!',
        data,
    });
}));
const deleteCategoryById = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = yield CategoriesServices_1.categoryServices.deleteCategoryById(id);
    (0, SuccessResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: 'Delete category by id successfully!',
        data,
    });
}));
exports.categoryController = {
    createCategory,
    retrieveAllCategory,
    retrieveCategoryById,
    updateCategoryById,
    deleteCategoryById,
};
