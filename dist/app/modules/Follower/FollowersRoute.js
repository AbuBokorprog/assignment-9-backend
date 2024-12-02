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
const router = express_1.default.Router();
router.post('/', (0, ValidationRequest_1.default)(FollowersValidation_1.followerValidation.createFollower), FollowersController_1.followerController.createFollower);
router.get('/', FollowersController_1.followerController.retrieveAllFollower);
router.get('/:id', FollowersController_1.followerController.retrieveFollowerById);
router.patch('/:id', FollowersController_1.followerController.updateFollowerById);
router.delete('/:id', FollowersController_1.followerController.deleteFollowerById);
exports.followerRouter = router;
