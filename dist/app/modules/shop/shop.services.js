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
exports.shopServices = void 0;
const PaginationHelpers_1 = require("../../helpers/PaginationHelpers");
const prisma_1 = __importDefault(require("../../helpers/prisma"));
const ImageUpload_1 = require("../../utils/ImageUpload");
const ShopConstants_1 = require("./ShopConstants");
const createShop = (files, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const logoResponse = yield (0, ImageUpload_1.ImageUpload)(`${payload.shopName}-logo`, files.logo[0].path);
    const shopLogo = logoResponse.secure_url;
    const coverResponse = yield (0, ImageUpload_1.ImageUpload)(`${payload.shopName}-cover`, files.cover[0].path);
    const shopCover = coverResponse.secure_url;
    const shopData = {
        shopName: payload.shopName,
        shopLogo: shopLogo,
        shopCover: shopCover,
        description: payload.description,
        vendorId: payload.vendorId,
        address: payload.address,
        registrationNumber: payload.registrationNumber,
        categoryId: payload.categoryId,
    };
    yield prisma_1.default.vendor.findUniqueOrThrow({
        where: {
            id: payload.vendorId,
        },
    });
    const shop = yield prisma_1.default.shop.create({
        data: shopData,
    });
    return shop;
});
const retrieveAllShop = (fieldParams, paginationParams) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { limit, page, skip, sortBy, sortOrder } = PaginationHelpers_1.paginationHelpers.calculatePagination(paginationParams);
    const { searchTerm } = fieldParams, filterFields = __rest(fieldParams, ["searchTerm"]);
    const andCondition = [];
    if (fieldParams === null || fieldParams === void 0 ? void 0 : fieldParams.searchTerm) {
        andCondition.push({
            OR: ShopConstants_1.searchableFields === null || ShopConstants_1.searchableFields === void 0 ? void 0 : ShopConstants_1.searchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    if (((_a = Object.keys(filterFields)) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        andCondition.push({
            AND: Object.keys(filterFields).map(key => ({
                [key]: {
                    equals: filterFields[key],
                },
            })),
        });
    }
    const whereCondition = {
        AND: andCondition,
    };
    const result = yield prisma_1.default.shop.findMany({
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
            followers: true,
            products: true,
            vendor: true,
            reviews: true,
        },
    });
    return result;
});
const retrieveAllAvailableShop = (fieldParams, paginationParams) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { limit, page, skip, sortBy, sortOrder } = PaginationHelpers_1.paginationHelpers.calculatePagination(paginationParams);
    const { searchTerm } = fieldParams, filterFields = __rest(fieldParams, ["searchTerm"]);
    const andCondition = [];
    if (fieldParams === null || fieldParams === void 0 ? void 0 : fieldParams.searchTerm) {
        andCondition.push({
            OR: ShopConstants_1.searchableFields === null || ShopConstants_1.searchableFields === void 0 ? void 0 : ShopConstants_1.searchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    if (((_a = Object.keys(filterFields)) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        andCondition.push({
            AND: Object.keys(filterFields).map(key => ({
                [key]: {
                    equals: filterFields[key],
                },
            })),
        });
    }
    const whereCondition = {
        AND: andCondition,
        isActive: 'APPROVED',
    };
    const result = yield prisma_1.default.shop.findMany({
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
            followers: true,
            products: true,
            vendor: true,
            reviews: true,
        },
    });
    return result;
});
const retrieveAllShopByVendor = (vendor) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistVendor = yield prisma_1.default.vendor.findUniqueOrThrow({
        where: {
            email: vendor.email,
            isDeleted: false,
        },
    });
    const result = yield prisma_1.default.shop.findMany({
        where: {
            vendorId: isExistVendor.id,
        },
        include: {
            category: true,
            followers: true,
            products: {
                include: {
                    reviews: true,
                    wishlist: true,
                },
            },
            reviews: true,
            vendor: true,
        },
    });
    return result;
});
const retrieveShopById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.shop.findUniqueOrThrow({
        where: {
            id: id,
        },
        include: {
            category: true,
            followers: {
                select: {
                    customerId: true,
                },
            },
            products: true,
            reviews: {
                select: {
                    rating: true,
                },
            },
            vendor: true,
        },
    });
    return result;
});
const updateShopById = (id, files, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (files.logo) {
        const logoResponse = yield (0, ImageUpload_1.ImageUpload)(`${payload.shopName}-logo`, files.logo[0].path);
        const shopLogo = logoResponse.secure_url;
        payload.shopLogo = shopLogo;
    }
    if (files.cover) {
        const coverResponse = yield (0, ImageUpload_1.ImageUpload)(`${payload.shopName}-cover`, files.cover[0].path);
        const shopCover = coverResponse.secure_url;
        payload.shopCover = shopCover;
    }
    yield prisma_1.default.shop.findUniqueOrThrow({
        where: {
            id: id,
        },
    });
    const result = yield prisma_1.default.shop.update({
        where: {
            id: id,
        },
        data: payload,
    });
    return result;
});
const updateStatus = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.shop.findUniqueOrThrow({
        where: {
            id: id,
        },
    });
    const result = yield prisma_1.default.shop.update({
        where: {
            id: id,
        },
        data: {
            isActive: status,
        },
    });
    return result;
});
const deleteShopById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.shop.findUniqueOrThrow({
        where: {
            id: id,
        },
    });
    const result = yield prisma_1.default.shop.delete({
        where: {
            id: id,
        },
    });
    return result;
});
exports.shopServices = {
    createShop,
    retrieveAllShop,
    retrieveShopById,
    updateShopById,
    retrieveAllShopByVendor,
    deleteShopById,
    retrieveAllAvailableShop,
    updateStatus,
};
