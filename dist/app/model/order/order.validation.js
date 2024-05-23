"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = __importDefault(require("mongoose"));
// Create a Joi schema for order validation
const orderValidationSchema = joi_1.default.object({
    productId: joi_1.default.string().custom((value, helpers) => {
        if (!mongoose_1.default.Types.ObjectId.isValid(value)) {
            return helpers.error("any.invalid");
        }
        return value;
    }, "ObjectId Validation").required(),
    email: joi_1.default.string().email().trim().required(),
    price: joi_1.default.number().required(),
    quantity: joi_1.default.number().integer().min(1).required()
});
exports.default = orderValidationSchema;
