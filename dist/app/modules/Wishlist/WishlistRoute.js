"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wishlistRouter = void 0;
const express_1 = __importDefault(require("express"));
const ValidationRequest_1 = __importDefault(require("../../utils/ValidationRequest"));
const Auth_1 = __importDefault(require("../../middlewares/Auth"));
const client_1 = require("@prisma/client");
const WishlistValidation_1 = require("./WishlistValidation");
const WishlistController_1 = require("./WishlistController");
const router = express_1.default.Router();
router.post('/', (0, Auth_1.default)(client_1.UserRole.CUSTOMER), (0, ValidationRequest_1.default)(WishlistValidation_1.wishlistValidation.createWishlist), WishlistController_1.wishlistController.createWishlist);
router.get('/user/my-wishlist', (0, Auth_1.default)(client_1.UserRole.CUSTOMER), WishlistController_1.wishlistController.retrieveAllWishlist);
router.get('/:id', WishlistController_1.wishlistController.retrieveWishlistById);
router.patch('/:id', WishlistController_1.wishlistController.updateWishlistById);
router.delete('/:id', WishlistController_1.wishlistController.deleteWishlistById);
exports.wishlistRouter = router;
