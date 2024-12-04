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
exports.authService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ComparePassword_1 = require("../../helpers/ComparePassword");
const prisma_1 = __importDefault(require("../../helpers/prisma"));
const AppError_1 = require("../../utils/AppError");
const AccessToken_1 = require("../../helpers/AccessToken");
const config_1 = __importDefault(require("../../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userLogin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistUser = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: payload.email,
            status: 'ACTIVE',
        },
    });
    const isMatchedPassword = yield (0, ComparePassword_1.ComparePassword)(payload.password, isExistUser.password);
    if (!isMatchedPassword) {
        throw new AppError_1.AppError(http_status_1.default.UNAUTHORIZED, 'You are unauthorized!');
    }
    const accessTokenData = {
        email: isExistUser.email,
        role: isExistUser.role,
    };
    const accessToken = yield (0, AccessToken_1.getAccessToken)(accessTokenData, config_1.default.access_token, config_1.default.access_expiresIn);
    const refreshToken = yield (0, AccessToken_1.getAccessToken)(accessTokenData, config_1.default.refresh_token, config_1.default.refresh_expiresIn);
    return {
        email: isExistUser.email,
        role: isExistUser.role,
        token: accessToken,
        refreshToken: refreshToken,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.refresh_token);
    const { email, role } = decoded;
    const isExistUser = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: email,
            status: 'ACTIVE',
        },
    });
    const accessTokenData = {
        email: isExistUser.email,
        role: isExistUser.role,
    };
    const accessToken = yield (0, AccessToken_1.getAccessToken)(accessTokenData, config_1.default.access_token, config_1.default.access_expiresIn);
    return {
        email: isExistUser.email,
        role: isExistUser.role,
        token: accessToken,
    };
});
const userSignUp = (payload) => __awaiter(void 0, void 0, void 0, function* () { });
exports.authService = { userSignUp, userLogin, refreshToken };
