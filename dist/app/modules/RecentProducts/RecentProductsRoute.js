"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recentProductsRouter = void 0;
const express_1 = __importDefault(require("express"));
const ValidationRequest_1 = __importDefault(require("../../utils/ValidationRequest"));
const RecentProducts_validation_1 = require("./RecentProducts.validation");
const RecentProductsController_1 = require("./RecentProductsController");
const router = express_1.default.Router();
router.post('/', (0, ValidationRequest_1.default)(RecentProducts_validation_1.recentProductsValidation.createRecentValidation), RecentProductsController_1.recentProductsController.createRecentProducts);
router.get('/', RecentProductsController_1.recentProductsController.retrieveAllRecentProducts);
router.get('/:id', RecentProductsController_1.recentProductsController.retrieveRecentProductsById);
router.patch('/:id', RecentProductsController_1.recentProductsController.updateRecentProductsById);
router.delete('/:id', RecentProductsController_1.recentProductsController.deleteRecentProductsById);
exports.recentProductsRouter = router;
