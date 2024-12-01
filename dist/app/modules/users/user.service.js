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
const hash_password_1 = require("../../helpers/hash-password");
const createAdmin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const password = yield (0, hash_password_1.HashPassword)(payload.password);
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
const createVendor = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const password = yield (0, hash_password_1.HashPassword)(payload.password);
    const userData = {
        email: payload.email,
        password: password,
        role: client_1.UserRole.VENDOR,
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
        const vendor = yield transactionClient.vendor.create({
            data: adminData,
        });
        return vendor;
    }));
    return result;
});
const createCustomer = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const password = yield (0, hash_password_1.HashPassword)(payload.password);
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
    return result;
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
exports.userServices = {
    createAdmin,
    createVendor,
    createCustomer,
    retrieveAllUsers,
    retrieveUserById,
};
