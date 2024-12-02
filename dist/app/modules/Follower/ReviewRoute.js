"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewRouter = void 0;
const express_1 = __importDefault(require("express"));
const ValidationRequest_1 = __importDefault(require("../../utils/ValidationRequest"));
const ReviewController_1 = require("./ReviewController");
const ReviewValidation_1 = require("./ReviewValidation");
const router = express_1.default.Router();
router.post('/', (0, ValidationRequest_1.default)(ReviewValidation_1.reviewValidation.createReview), ReviewController_1.reviewController.createReview);
router.get('/', ReviewController_1.reviewController.retrieveAllReview);
router.get('/:id', ReviewController_1.reviewController.retrieveReviewById);
router.patch('/:id', ReviewController_1.reviewController.updateReviewById);
router.delete('/:id', ReviewController_1.reviewController.deleteReviewById);
exports.reviewRouter = router;
