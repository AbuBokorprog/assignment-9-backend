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
exports.authController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const CatchAsync_1 = __importDefault(require("../../utils/CatchAsync"));
const SuccessResponse_1 = __importDefault(require("../../utils/SuccessResponse"));
const AuthService_1 = require("./AuthService");
const config_1 = __importDefault(require("../../config"));
const userLogin = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield AuthService_1.authService.userLogin(req.body);
    const { refreshToken } = data;
    req.cookies('refreshToken', refreshToken, {
        secure: config_1.default.node_env === 'production',
        httpOnly: true,
    });
    (0, SuccessResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: 'Login successfully!',
        data,
    });
}));
const refreshToken = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    const result = yield AuthService_1.authService.refreshToken(refreshToken);
    (0, SuccessResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: 'Access token is retrieved successfully!',
        data: result,
    });
}));
const userSignUp = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield AuthService_1.authService.userSignUp(req.body);
    (0, SuccessResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: 'Signup successfully!',
        data,
    });
}));
exports.authController = { userLogin, userSignUp, refreshToken };
