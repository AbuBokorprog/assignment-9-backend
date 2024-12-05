"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../modules/users/user.route");
const shop_route_1 = require("../modules/shop/shop.route");
const ProductsRoute_1 = require("../modules/Products/ProductsRoute");
const CategoriesRoute_1 = require("../modules/Categories/CategoriesRoute");
const CouponRoute_1 = require("../modules/Coupon/CouponRoute");
const ReviewRoute_1 = require("../modules/Review/ReviewRoute");
const FollowersRoute_1 = require("../modules/Follower/FollowersRoute");
const AuthRoute_1 = require("../modules/Auth/AuthRoute");
const ComparisonRoute_1 = require("../modules/Comparison/ComparisonRoute");
const CartsRoute_1 = require("../modules/Carts/CartsRoute");
const OrderRoute_1 = require("../modules/Orders/OrderRoute");
const reports_route_1 = require("../modules/dashboard-reports/reports.route");
const RecentProductsRoute_1 = require("../modules/RecentProducts/RecentProductsRoute");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth',
        route: AuthRoute_1.authRouter,
    },
    {
        path: '/users',
        route: user_route_1.userRouter,
    },
    {
        path: '/shop',
        route: shop_route_1.shopRouter,
    },
    {
        path: '/category',
        route: CategoriesRoute_1.categoryRouter,
    },
    {
        path: '/products',
        route: ProductsRoute_1.productRouter,
    },
    {
        path: '/recently-viewed',
        route: RecentProductsRoute_1.recentProductsRouter,
    },
    {
        path: '/carts',
        route: CartsRoute_1.cartRouter,
    },
    {
        path: '/orders',
        route: OrderRoute_1.orderRouter,
    },
    {
        path: '/coupon',
        route: CouponRoute_1.couponRouter,
    },
    {
        path: '/reviews',
        route: ReviewRoute_1.reviewRouter,
    },
    {
        path: '/follower',
        route: FollowersRoute_1.followerRouter,
    },
    {
        path: '/comparison',
        route: ComparisonRoute_1.comparisonRouter,
    },
    {
        path: '/dashboard-reports',
        route: reports_route_1.reportsRoute,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
