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
const ImageUpload_1 = require("../../utils/ImageUpload");
const client_1 = require("@prisma/client");
const Auth_1 = __importDefault(require("../../middlewares/Auth"));
const router = express_1.default.Router();
router.post('/', (0, Auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.SUPER_ADMIN), ImageUpload_1.upload.single('file'), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, ValidationRequest_1.default)(CategoriesValidation_1.categoryValidation.CreateCategorySchema), CategoriesController_1.categoryController.createCategory);
router.get('/', CategoriesController_1.categoryController.retrieveAllCategory);
router.get('/:id', CategoriesController_1.categoryController.retrieveCategoryById);
router.patch('/:id', (0, Auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.SUPER_ADMIN), ImageUpload_1.upload.single('file'), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, CategoriesController_1.categoryController.updateCategoryById);
router.delete('/:id', (0, Auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.SUPER_ADMIN), CategoriesController_1.categoryController.deleteCategoryById);
exports.categoryRouter = router;
