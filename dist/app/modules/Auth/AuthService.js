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
const HashPassword_1 = require("../../helpers/HashPassword");
const SendMail_1 = require("../../utils/SendMail");
const VerifyToken_1 = require("../../helpers/VerifyToken");
const userLogin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    const isExistUser = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: payload.email,
            status: 'ACTIVE',
        },
        include: {
            admin: true,
            customer: true,
            vendor: true,
        },
    });
    function getUserByRole(role, email) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (role) {
                case 'ADMIN':
                case 'SUPER_ADMIN': // Both ADMIN and SUPER_ADMIN query the `admin` table
                    return yield prisma_1.default.admin.findUniqueOrThrow({ where: { email } });
                case 'VENDOR':
                    return yield prisma_1.default.vendor.findUniqueOrThrow({ where: { email } });
                case 'CUSTOMER':
                    return yield prisma_1.default.customer.findUniqueOrThrow({ where: { email } });
                default:
                    throw new Error('Invalid role');
            }
        });
    }
    // const user = await getUserByRole(isExistUser.role, isExistUser.email)
    const isMatchedPassword = yield (0, ComparePassword_1.ComparePassword)(payload.password, isExistUser.password);
    if (!isMatchedPassword) {
        throw new AppError_1.AppError(http_status_1.default.UNAUTHORIZED, 'You are unauthorized!');
    }
    const accessTokenData = {
        email: isExistUser.email,
        name: (isExistUser === null || isExistUser === void 0 ? void 0 : isExistUser.admin)
            ? (_a = isExistUser === null || isExistUser === void 0 ? void 0 : isExistUser.admin) === null || _a === void 0 ? void 0 : _a.name
            : (isExistUser === null || isExistUser === void 0 ? void 0 : isExistUser.vendor)
                ? (_b = isExistUser === null || isExistUser === void 0 ? void 0 : isExistUser.vendor) === null || _b === void 0 ? void 0 : _b.name
                : (_c = isExistUser === null || isExistUser === void 0 ? void 0 : isExistUser.customer) === null || _c === void 0 ? void 0 : _c.name,
        role: isExistUser.role,
        id: isExistUser.id,
    };
    const accessToken = yield (0, AccessToken_1.getAccessToken)(accessTokenData, config_1.default.access_token, config_1.default.access_expiresIn);
    const refreshToken = yield (0, AccessToken_1.getAccessToken)(accessTokenData, config_1.default.refresh_token, config_1.default.refresh_expiresIn);
    return {
        email: isExistUser.email,
        name: (isExistUser === null || isExistUser === void 0 ? void 0 : isExistUser.admin)
            ? (_d = isExistUser === null || isExistUser === void 0 ? void 0 : isExistUser.admin) === null || _d === void 0 ? void 0 : _d.name
            : (isExistUser === null || isExistUser === void 0 ? void 0 : isExistUser.vendor)
                ? (_e = isExistUser === null || isExistUser === void 0 ? void 0 : isExistUser.vendor) === null || _e === void 0 ? void 0 : _e.name
                : (_f = isExistUser === null || isExistUser === void 0 ? void 0 : isExistUser.customer) === null || _f === void 0 ? void 0 : _f.name,
        role: isExistUser.role,
        token: accessToken,
        id: isExistUser.id,
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
        id: isExistUser.id,
    };
    const accessToken = yield (0, AccessToken_1.getAccessToken)(accessTokenData, config_1.default.access_token, config_1.default.access_expiresIn);
    return {
        email: isExistUser.email,
        role: isExistUser.role,
        id: isExistUser.id,
        token: accessToken,
    };
});
const changePassword = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistUser = yield prisma_1.default.user.findUniqueOrThrow({
        where: { id: user === null || user === void 0 ? void 0 : user.id, status: 'ACTIVE' },
        include: {
            admin: true,
            vendor: true,
            customer: true,
        },
    });
    const isMatchedPassword = yield (0, ComparePassword_1.ComparePassword)(payload.oldPassword, isExistUser === null || isExistUser === void 0 ? void 0 : isExistUser.password);
    if (!isMatchedPassword) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'Old password not matched!');
    }
    const newHashedPassword = yield (0, HashPassword_1.HashPassword)(payload.newPassword);
    const result = yield prisma_1.default.user.update({
        where: {
            id: user === null || user === void 0 ? void 0 : user.id,
        },
        data: {
            password: newHashedPassword,
        },
    });
    return result;
});
const forgotPassword = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const isExistUser = yield prisma_1.default.user.findFirst({
        where: {
            email: payload.email,
            status: 'ACTIVE',
        },
        include: {
            admin: true,
            vendor: true,
            customer: true,
        },
    });
    if (!isExistUser) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'User not found please register your account!');
    }
    const resetTokenData = {
        email: isExistUser.email,
        name: isExistUser.admin
            ? (_a = isExistUser === null || isExistUser === void 0 ? void 0 : isExistUser.admin) === null || _a === void 0 ? void 0 : _a.name
            : (isExistUser === null || isExistUser === void 0 ? void 0 : isExistUser.vendor)
                ? (_b = isExistUser === null || isExistUser === void 0 ? void 0 : isExistUser.vendor) === null || _b === void 0 ? void 0 : _b.name
                : (_c = isExistUser === null || isExistUser === void 0 ? void 0 : isExistUser.customer) === null || _c === void 0 ? void 0 : _c.name,
        role: isExistUser.role,
        id: isExistUser.id,
    };
    const accessToken = yield (0, AccessToken_1.getAccessToken)(resetTokenData, config_1.default.access_token, '5m');
    const resetLink = `https://bazaar-bridge-front.vercel.app/reset-password?email=${isExistUser === null || isExistUser === void 0 ? void 0 : isExistUser.email}&token=${accessToken}`;
    (0, SendMail_1.SendMail)(isExistUser === null || isExistUser === void 0 ? void 0 : isExistUser.email, resetLink);
});
const resetPassword = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: payload.email,
        },
    });
    const decode = (0, VerifyToken_1.VerifyToken)(payload === null || payload === void 0 ? void 0 : payload.token, config_1.default.access_token);
    if (!decode) {
        throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'Token expired!');
    }
    if (payload.email !== (decode === null || decode === void 0 ? void 0 : decode.email)) {
        throw new AppError_1.AppError(http_status_1.default.UNAUTHORIZED, 'User unauthorized!');
    }
    const newHashedPassword = yield (0, HashPassword_1.HashPassword)(payload.newPassword);
    const result = yield prisma_1.default.user.update({
        where: {
            email: payload === null || payload === void 0 ? void 0 : payload.email,
        },
        data: {
            password: newHashedPassword,
        },
    });
    return result;
});
exports.authService = {
    changePassword,
    userLogin,
    refreshToken,
    resetPassword,
    forgotPassword,
};
