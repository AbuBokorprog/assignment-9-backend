"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.followerRouter = void 0;
const express_1 = __importDefault(require("express"));
const ValidationRequest_1 = __importDefault(require("../../utils/ValidationRequest"));
const FollowersValidation_1 = require("./FollowersValidation");
const FollowersController_1 = require("./FollowersController");
const Auth_1 = __importDefault(require("../../middlewares/Auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.post('/shop-follow', (0, Auth_1.default)(client_1.UserRole.CUSTOMER, client_1.UserRole.ADMIN, client_1.UserRole.SUPER_ADMIN, client_1.UserRole.SUPER_ADMIN), (0, ValidationRequest_1.default)(FollowersValidation_1.followerValidation.createFollower), FollowersController_1.followerController.FollowShop);
router.get('/my', (0, Auth_1.default)(client_1.UserRole.CUSTOMER, client_1.UserRole.ADMIN, client_1.UserRole.SUPER_ADMIN, client_1.UserRole.SUPER_ADMIN), FollowersController_1.followerController.retrieveMyFollowingShop);
exports.followerRouter = router;
