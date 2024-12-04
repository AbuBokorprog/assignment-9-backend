"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
exports.default = {
    node_env: process.env.NODE_ENV,
    port: process.env.PORT,
    salt: process.env.SALT,
    access_token: process.env.ACCESS_TOKEN,
    access_expiresIn: process.env.EXPIRES_IN,
    refresh_token: process.env.REFRESH_TOKEN,
    refresh_expiresIn: process.env.REFRESH_EXPIRES_IN,
    cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
    cloudinary_secret_key: process.env.CLOUDINARY_SECRET_KEY,
};
