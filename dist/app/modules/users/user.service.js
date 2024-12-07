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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../helpers/prisma"));
const HashPassword_1 = require("../../helpers/HashPassword");
const ImageUpload_1 = require("../../utils/ImageUpload");
const createAdmin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const password = yield (0, HashPassword_1.HashPassword)(payload.password);
    const userData = {
        email: payload.email,
        password: password,
        role: client_1.UserRole.ADMIN,
        status: client_1.UserStatus.ACTIVE,
    };
    const adminData = {
        name: payload.name,
        email: payload.email,
        contactNumber: payload.contactNumber,
        isDeleted: false,
    };
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        yield transactionClient.user.create({
            data: userData,
        });
        const admin = yield transactionClient.admin.create({
            data: adminData,
        });
        return admin;
    }));
    return result;
});
const createVendor = (files, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const password = yield (0, HashPassword_1.HashPassword)(payload.password);
    const userData = {
        email: payload.email,
        password: password,
        role: client_1.UserRole.VENDOR,
        status: client_1.UserStatus.ACTIVE,
    };
    const vendorData = {
        name: payload.name,
        email: payload.email,
        contactNumber: payload.contactNumber,
        isDeleted: false,
    };
    const logoResponse = yield (0, ImageUpload_1.ImageUpload)(`${payload.shopName}-logo`, files.logo[0].path);
    const shopLogo = logoResponse.secure_url;
    const coverResponse = yield (0, ImageUpload_1.ImageUpload)(`${payload.shopName}-cover`, files.cover[0].path);
    const shopCover = coverResponse.secure_url;
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        yield transactionClient.user.create({
            data: userData,
        });
        const vendor = yield transactionClient.vendor.create({
            data: vendorData,
        });
        const shopData = {
            shopName: payload.shopName,
            shopLogo: shopLogo,
            shopCover: shopCover,
            description: payload.description,
            vendorId: vendor.id,
            address: payload.address,
            registrationNumber: payload.registrationNumber,
            categoryId: payload.categoryId,
        };
        yield transactionClient.shop.create({
            data: shopData,
        });
        return vendor;
    }));
    return result;
});
const createCustomer = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const password = yield (0, HashPassword_1.HashPassword)(payload.password);
    const userData = {
        email: payload.email,
        password: password,
        role: client_1.UserRole.CUSTOMER,
        status: client_1.UserStatus.ACTIVE,
    };
    const customerData = {
        name: payload.name,
        email: payload.email,
        contactNumber: payload.contactNumber,
        isDeleted: false,
    };
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        yield transactionClient.user.create({
            data: userData,
        });
        const customer = yield transactionClient.customer.create({
            data: customerData,
        });
        return customer;
    }));
    return result;
});
const retrieveAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findMany({
        include: {
            admin: true,
            customer: true,
            vendor: true,
        },
    });
    const data = result === null || result === void 0 ? void 0 : result.map(u => {
        var _a, _b, _c, _d, _e, _f;
        return ({
            email: u.email,
            id: u.id,
            role: u.role,
            status: u.status,
            name: u.admin ? u.admin.name : u.vendor ? (_a = u.vendor) === null || _a === void 0 ? void 0 : _a.name : (_b = u.customer) === null || _b === void 0 ? void 0 : _b.name,
            profile: u.admin
                ? u.admin.profilePhoto
                : u.vendor
                    ? (_c = u.vendor) === null || _c === void 0 ? void 0 : _c.profilePhoto
                    : (_d = u.customer) === null || _d === void 0 ? void 0 : _d.profilePhoto,
            phone: u.admin
                ? u.admin.contactNumber
                : u.vendor
                    ? (_e = u.vendor) === null || _e === void 0 ? void 0 : _e.contactNumber
                    : (_f = u.customer) === null || _f === void 0 ? void 0 : _f.contactNumber,
        });
    });
    return data;
});
const retrieveUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: id,
        },
        include: {
            admin: true,
            customer: true,
            vendor: true,
        },
    });
    return result;
});
const myProfile = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const includeOptions = {};
    // Dynamically set include options based on the role
    if (user.role === 'ADMIN' || user.role === 'SUPER_ADMIN') {
        includeOptions.admin = true;
    }
    else if (user.role === 'CUSTOMER') {
        includeOptions.customer = true;
    }
    else if (user.role === 'VENDOR') {
        includeOptions.vendor = true;
    }
    const result = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: user.email,
        },
        include: includeOptions,
    });
    return result;
});
exports.userServices = {
    createAdmin,
    createVendor,
    createCustomer,
    retrieveAllUsers,
    retrieveUserById,
    myProfile,
};
