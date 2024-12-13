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
exports.seedSuperAdmin = void 0;
const HashPassword_1 = require("../helpers/HashPassword");
const prisma_1 = __importDefault(require("../helpers/prisma"));
const seedSuperAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    // Check if a SUPER_ADMIN already exists
    const isExistSuperAdmin = yield prisma_1.default.user.findFirst({
        where: {
            email: 'superadmin@gmail.com',
        },
    });
    // If no SUPER_ADMIN exists, create one
    if (!isExistSuperAdmin) {
        const hashPassword = yield (0, HashPassword_1.HashPassword)('super@admin');
        const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
            // Create the user with SUPER_ADMIN role
            const userData = yield transactionClient.user.create({
                data: {
                    email: 'superadmin@gmail.com',
                    password: hashPassword,
                    role: 'SUPER_ADMIN',
                    status: 'ACTIVE',
                },
            });
            // Create the admin record associated with the SUPER_ADMIN
            yield transactionClient.admin.create({
                data: {
                    name: 'Super Admin',
                    email: userData.email,
                    contactNumber: '01234567890',
                    profilePhoto: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
                    isDeleted: false,
                },
            });
            return userData; // Return the created user data for confirmation
        }));
        return result;
    }
    console.log('Super Admin already exists.');
});
exports.seedSuperAdmin = seedSuperAdmin;
