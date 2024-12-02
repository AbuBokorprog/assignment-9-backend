"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.ImageUpload = void 0;
const cloudinary_1 = require("cloudinary");
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const config_1 = __importDefault(require("../config"));
cloudinary_1.v2.config({
    cloud_name: 'dphjei2ph',
    api_key: config_1.default.cloudinary_api_key,
    api_secret: config_1.default.cloudinary_secret_key,
});
const ImageUpload = (imageName, path) => {
    return new Promise((resolve, reject) => {
        cloudinary_1.v2.uploader.upload(path, {
            public_id: imageName.trim(),
        }, function (error, result) {
            if (error) {
                reject(error);
            }
            resolve(result);
            fs_1.default.unlink(path, err => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('File is deleted');
                }
            });
        });
    });
};
exports.ImageUpload = ImageUpload;
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.cwd() + '/uploads');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    },
});
exports.upload = (0, multer_1.default)({ storage: storage });
