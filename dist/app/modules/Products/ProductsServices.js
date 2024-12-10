"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productServices = void 0;
const PaginationHelpers_1 = require("../../helpers/PaginationHelpers");
const prisma_1 = __importDefault(require("../../helpers/prisma"));
const ImageUpload_1 = require("../../utils/ImageUpload");
const ProductsContaints_1 = require("./ProductsContaints");
const createProduct = (files, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Upload files and collect their URLs
    const images = [];
    if (files) {
        for (const file of files) {
            const response = yield (0, ImageUpload_1.ImageUpload)(payload.name, file.path); // Upload each file
            images.push(response.secure_url); // Collect uploaded URLs
        }
    }
    const shopData = yield prisma_1.default.shop.findUniqueOrThrow({
        where: {
            id: payload.shopId,
        },
    });
    yield prisma_1.default.vendor.findUniqueOrThrow({
        where: {
            id: shopData.vendorId,
            isDeleted: false,
        },
    });
    yield prisma_1.default.category.findUniqueOrThrow({
        where: {
            id: payload.categoryId,
        },
    });
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const product = yield transactionClient.product.create({
            data: {
                name: payload === null || payload === void 0 ? void 0 : payload.name,
                regular_price: Number(payload === null || payload === void 0 ? void 0 : payload.regular_price),
                discount_price: Number(payload === null || payload === void 0 ? void 0 : payload.discount_price),
                description: payload === null || payload === void 0 ? void 0 : payload.description,
                images: images,
                productStatus: payload.productStatus && payload.productStatus,
                inventory: Number(payload === null || payload === void 0 ? void 0 : payload.inventory),
                categoryId: payload === null || payload === void 0 ? void 0 : payload.categoryId,
                vendorId: shopData === null || shopData === void 0 ? void 0 : shopData.vendorId,
                shopId: payload === null || payload === void 0 ? void 0 : payload.shopId,
            },
        });
        const productSize = (_a = payload.productSize) === null || _a === void 0 ? void 0 : _a.map((s) => ({
            size: s.size,
            stock: Number(s.stock),
            productId: product.id,
        }));
        if (productSize) {
            try {
                yield transactionClient.sizeOption.createMany({
                    data: productSize,
                });
            }
            catch (error) {
                console.log(error);
            }
        }
        const productColors = (_b = payload.productColors) === null || _b === void 0 ? void 0 : _b.map((c) => ({
            color: c.color,
            stock: Number(c.colorStock),
            code: c.colorCode,
            productId: product.id,
        }));
        if (productColors) {
            try {
                yield transactionClient.colorOption.createMany({
                    data: productColors,
                });
            }
            catch (error) {
                console.log(error);
            }
        }
        return {
            product,
        };
    }));
    return result;
});
const retrieveAllProduct = (fieldParams, paginationOption) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { limit, page, skip, sortBy, sortOrder } = PaginationHelpers_1.paginationHelpers.calculatePagination(paginationOption);
    const { searchTerm } = fieldParams, filterData = __rest(fieldParams, ["searchTerm"]);
    const andCondition = [];
    // search params
    if (fieldParams.searchTerm) {
        andCondition.push({
            OR: ProductsContaints_1.searchableFields.map(field => ({
                [field]: {
                    contains: fieldParams.searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    // specific field
    if (((_a = Object.keys(filterData)) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        andCondition.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: filterData[key],
                },
            })),
        });
    }
    const whereCondition = { AND: andCondition };
    const result = yield prisma_1.default.product.findMany({
        where: whereCondition,
        skip: skip,
        take: limit,
        orderBy: sortBy && sortOrder
            ? {
                [sortBy]: sortOrder,
            }
            : {
                createdAt: 'desc',
            },
        include: {
            category: true,
            colors: true,
            sizes: true,
            shop: true,
            reviews: true,
            orders: true,
            wishlist: true,
        },
    });
    const total = yield prisma_1.default.product.count({
        where: whereCondition,
    });
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const retrieveAllProductByVendor = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const vendorData = yield prisma_1.default.vendor.findUniqueOrThrow({
        where: {
            email: user === null || user === void 0 ? void 0 : user.email,
        },
    });
    const result = yield prisma_1.default.product.findMany({
        where: {
            vendorId: vendorData.id,
        },
        include: {
            category: true,
            colors: true,
            sizes: true,
            shop: true,
            reviews: true,
            orders: true,
            wishlist: true,
        },
    });
    return result;
});
const allAvailableProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.product.findMany({
        where: {
            isActive: 'APPROVED',
            stockStatus: 'IN_STOCK',
        },
    });
    return result;
});
const allFlashSaleProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.product.findMany({
        where: {
            productStatus: 'FLASH_SALE',
            isActive: 'APPROVED',
            stockStatus: 'IN_STOCK',
        },
    });
    return result;
});
const retrieveProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.product.findUniqueOrThrow({
        where: {
            id: id,
        },
        include: {
            category: true,
            colors: true,
            sizes: true,
            shop: true,
            reviews: true,
            orders: true,
            wishlist: true,
        },
    });
    return result;
});
const updateProductById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.product.findUniqueOrThrow({
        where: {
            id: id,
        },
    });
    const result = yield prisma_1.default.product.update({
        where: {
            id: id,
        },
        data: payload,
    });
    return result;
});
const updateProductStatusId = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.product.findUniqueOrThrow({
        where: {
            id: id,
        },
    });
    const result = yield prisma_1.default.product.update({
        where: {
            id: id,
        },
        data: {
            isActive: status,
        },
    });
    return result;
});
const deleteProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.product.findUniqueOrThrow({
        where: {
            id: id,
        },
    });
    const result = yield prisma_1.default.product.delete({
        where: {
            id: id,
        },
    });
    return result;
});
exports.productServices = {
    createProduct,
    retrieveAllProduct,
    allAvailableProducts,
    allFlashSaleProducts,
    retrieveProductById,
    updateProductById,
    deleteProductById,
    updateProductStatusId,
    retrieveAllProductByVendor,
};
