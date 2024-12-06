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
const AppError_1 = require("./../utils/AppError");
const http_status_1 = __importDefault(require("http-status"));
const CatchAsync_1 = __importDefault(require("../utils/CatchAsync"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../helpers/prisma"));
const config_1 = __importDefault(require("../config"));
const Auth = (...userRoles) => {
    return (0, CatchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            throw new AppError_1.AppError(http_status_1.default.UNAUTHORIZED, "You're unauthorized!");
        }
        // Verify token
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.access_token);
        const { email, role, exp } = decoded;
        // Check if token is expired
        const currentTime = Math.floor(Date.now() / 1000);
        if (exp < currentTime) {
            throw new AppError_1.AppError(498, 'Access token has expired!');
        }
        // Verify user in the database
        const user = yield prisma_1.default.user.findUnique({
            where: { email },
        });
        if (!user || user.status !== 'ACTIVE') {
            throw new AppError_1.AppError(http_status_1.default.UNAUTHORIZED, "You're unauthorized!");
        }
        // Check role
        if (userRoles.length > 0 && !userRoles.includes(role)) {
            throw new AppError_1.AppError(http_status_1.default.FORBIDDEN, "You don't have permission!");
        }
        // Attach user to request
        req.user = decoded;
        next();
    }));
};
exports.default = Auth;
