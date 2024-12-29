"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newsletterRoute = void 0;
const express_1 = __importDefault(require("express"));
const NewsletterController_1 = require("./NewsletterController");
const ValidationRequest_1 = __importDefault(require("../../utils/ValidationRequest"));
const NewsletterValidation_1 = require("./NewsletterValidation");
const route = express_1.default.Router();
route.post('/', (0, ValidationRequest_1.default)(NewsletterValidation_1.newsletterValidation.subscribeNewsletter), NewsletterController_1.newsletterController.subscribeNewsletter);
route.get('/', NewsletterController_1.newsletterController.retrieveAllSubscriber);
exports.newsletterRoute = route;
