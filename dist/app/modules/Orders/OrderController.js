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
exports.ordersController = void 0;
const CatchAsync_1 = __importDefault(require("../../utils/CatchAsync"));
const createOrder = (0, CatchAsync_1.default)(() => __awaiter(void 0, void 0, void 0, function* () { }));
const retrieveOrder = (0, CatchAsync_1.default)(() => __awaiter(void 0, void 0, void 0, function* () { }));
const retrieveOrderById = (0, CatchAsync_1.default)(() => __awaiter(void 0, void 0, void 0, function* () { }));
const updateOrder = (0, CatchAsync_1.default)(() => __awaiter(void 0, void 0, void 0, function* () { }));
const deleteOrder = (0, CatchAsync_1.default)(() => __awaiter(void 0, void 0, void 0, function* () { }));
exports.ordersController = {
    createOrder,
    retrieveOrder,
    retrieveOrderById,
    updateOrder,
    deleteOrder,
};
