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
router.post('/shop-follow', (0, Auth_1.default)(client_1.UserRole.CUSTOMER), (0, ValidationRequest_1.default)(FollowersValidation_1.followerValidation.createFollower), FollowersController_1.followerController.FollowShop);
router.post('/shop-unfollow', (0, ValidationRequest_1.default)(FollowersValidation_1.followerValidation.createFollower), FollowersController_1.followerController.unFollowShop);
// router.get('/', followerController.retrieveAllFollower)
// router.get('/:id', followerController.retrieveFollowerById)
// router.patch('/:id', followerController.updateFollowerById)
// router.delete('/:id', followerController.deleteFollowerById)
exports.followerRouter = router;
