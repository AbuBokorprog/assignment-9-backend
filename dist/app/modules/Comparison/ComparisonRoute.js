"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparisonRouter = void 0;
const express_1 = __importDefault(require("express"));
const ValidationRequest_1 = __importDefault(require("../../utils/ValidationRequest"));
const ComparisonValidation_1 = require("./ComparisonValidation");
const ComparisonController_1 = require("./ComparisonController");
const Auth_1 = __importDefault(require("../../middlewares/Auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.post('/', (0, ValidationRequest_1.default)(ComparisonValidation_1.comparisonValidation.createComparison), ComparisonController_1.comparisonController.createComparison);
router.get('/user/my-comparison', (0, Auth_1.default)(client_1.UserRole.CUSTOMER), ComparisonController_1.comparisonController.retrieveAllComparison);
router.get('/:id', ComparisonController_1.comparisonController.retrieveComparisonById);
router.patch('/:id', ComparisonController_1.comparisonController.updateComparisonById);
router.delete('/:id', ComparisonController_1.comparisonController.deleteComparisonById);
exports.comparisonRouter = router;
