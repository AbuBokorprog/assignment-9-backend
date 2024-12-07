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
exports.comparisonController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const SuccessResponse_1 = __importDefault(require("../../utils/SuccessResponse"));
const CatchAsync_1 = __importDefault(require("../../utils/CatchAsync"));
const ComparisonServices_1 = require("./ComparisonServices");
const createComparison = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield ComparisonServices_1.comparisonServices.createComparison(req.body);
    (0, SuccessResponse_1.default)(res, {
        status: http_status_1.default.CREATED,
        success: true,
        message: 'Create comparison successfully!',
        data,
    });
}));
const retrieveAllComparison = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield ComparisonServices_1.comparisonServices.retrieveAllMyComparison(req === null || req === void 0 ? void 0 : req.user);
    (0, SuccessResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: 'Retrieve all comparisons successfully!',
        data,
    });
}));
const retrieveComparisonById = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = yield ComparisonServices_1.comparisonServices.retrieveComparisonById(id);
    (0, SuccessResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: 'Retrieve comparison by id successfully!',
        data,
    });
}));
const updateComparisonById = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = yield ComparisonServices_1.comparisonServices.updateComparisonById(id, req.body);
    (0, SuccessResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: 'Update comparison by id successfully!',
        data,
    });
}));
const deleteComparisonById = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = yield ComparisonServices_1.comparisonServices.deleteComparisonById(id);
    (0, SuccessResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: 'Delete comparison by id successfully!',
        data,
    });
}));
exports.comparisonController = {
    createComparison,
    retrieveAllComparison,
    retrieveComparisonById,
    updateComparisonById,
    deleteComparisonById,
};
