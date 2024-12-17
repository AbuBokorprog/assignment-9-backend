"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const routers_1 = __importDefault(require("./app/routers"));
const GlobalErrorHandler_1 = __importDefault(require("./app/middlewares/GlobalErrorHandler"));
const NotFoundErrorHandler_1 = __importDefault(require("./app/middlewares/NotFoundErrorHandler"));
app.use((0, cors_1.default)({
    credentials: true,
    origin: 'https://bazaar-bridge-front.vercel.app',
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.get('/', (req, res) => {
    res.send('BazaarBridge Home page!');
});
app.use('/api', routers_1.default);
app.use(GlobalErrorHandler_1.default);
app.use(NotFoundErrorHandler_1.default);
exports.default = app;
