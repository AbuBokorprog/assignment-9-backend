"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const AuthController_1 = require("./AuthController");
const ValidationRequest_1 = __importDefault(require("../../utils/ValidationRequest"));
const AuthValidation_1 = require("./AuthValidation");
const route = express_1.default.Router();
route.post('/login', AuthController_1.authController.userLogin);
route.post('/refresh-token', (0, ValidationRequest_1.default)(AuthValidation_1.authValidation.refreshTokenValidationSchema), AuthController_1.authController.refreshToken);
route.post('/sign-up', AuthController_1.authController.userSignUp);
exports.authRouter = route;
