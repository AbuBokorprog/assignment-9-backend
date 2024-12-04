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
const Auth = (...userRole) => {
    return (0, CatchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(',')[1];
        if (!token) {
            throw new AppError_1.AppError(http_status_1.default.UNAUTHORIZED, "You're unauthorized!");
        }
        // checking if the given token is valid
        const decoded = jsonwebtoken_1.default.verify(token, 'secret');
        const { email, role, exp } = decoded;
        const currentTime = Math.floor(Date.now() / 1000);
        if (exp < currentTime) {
            throw new AppError_1.AppError(498, 'Access token are expired!');
        }
        yield prisma_1.default.user.findUniqueOrThrow({
            where: {
                email: email,
                status: 'ACTIVE',
            },
        });
        if (userRole && !userRole.include(role)) {
            throw new AppError_1.AppError(http_status_1.default.UNAUTHORIZED, "You're unAuthorized!");
        }
        req.user = decoded;
        next();
    }));
};
exports.default = Auth;
