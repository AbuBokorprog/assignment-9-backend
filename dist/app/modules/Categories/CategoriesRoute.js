"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = void 0;
const express_1 = __importDefault(require("express"));
const ValidationRequest_1 = __importDefault(require("../../utils/ValidationRequest"));
const CategoriesController_1 = require("./CategoriesController");
const CategoriesValidation_1 = require("./CategoriesValidation");
const router = express_1.default.Router();
router.post('/', (0, ValidationRequest_1.default)(CategoriesValidation_1.categoryValidation.CreateCategorySchema), CategoriesController_1.categoryController.createCategory);
router.get('/', CategoriesController_1.categoryController.retrieveAllCategory);
router.get('/:id', CategoriesController_1.categoryController.retrieveCategoryById);
router.patch('/:id', CategoriesController_1.categoryController.updateCategoryById);
router.delete('/:id', CategoriesController_1.categoryController.deleteCategoryById);
exports.categoryRouter = router;
