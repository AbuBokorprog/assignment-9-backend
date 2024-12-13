"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const ValidationRequest_1 = __importDefault(require("../../utils/ValidationRequest"));
const user_validation_1 = require("./user.validation");
const Auth_1 = __importDefault(require("../../middlewares/Auth"));
const client_1 = require("@prisma/client");
const ImageUpload_1 = require("../../utils/ImageUpload");
const router = express_1.default.Router();
router.post('/create-admin', (0, ValidationRequest_1.default)(user_validation_1.userValidation.createAdmin), user_controller_1.userControllers.createAdmin);
router.post('/create-vendor', ImageUpload_1.upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'cover', maxCount: 1 },
]), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, ValidationRequest_1.default)(user_validation_1.userValidation.createVendor), user_controller_1.userControllers.createVendor);
router.post('/create-customer', (0, ValidationRequest_1.default)(user_validation_1.userValidation.createAdmin), user_controller_1.userControllers.createCustomer);
router.get('/', (0, Auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.SUPER_ADMIN), user_controller_1.userControllers.retrieveAllUsers);
router.get('/:id', user_controller_1.userControllers.retrieveUserById);
router.patch('/status/user-status', (0, Auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.SUPER_ADMIN), user_controller_1.userControllers.userStatusChanged);
router.patch('/role/user-role', (0, Auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.SUPER_ADMIN, client_1.UserRole.CUSTOMER, client_1.UserRole.VENDOR), user_controller_1.userControllers.userRoleUpdate);
router.get('/profile/my-profile', (0, Auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.CUSTOMER, client_1.UserRole.SUPER_ADMIN, client_1.UserRole.VENDOR), user_controller_1.userControllers.myProfile);
router.patch('/profile/my-profile', (0, Auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.CUSTOMER, client_1.UserRole.SUPER_ADMIN, client_1.UserRole.VENDOR), user_controller_1.userControllers.updateMyProfile);
exports.userRouter = router;
