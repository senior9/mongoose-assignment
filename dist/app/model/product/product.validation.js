"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
// Variant Joi schema
const variantJoiSchema = joi_1.default.object({
    type: joi_1.default.string().trim().required(),
    value: joi_1.default.string().trim().required()
});
// Inventory Joi schema
const inventoryJoiSchema = joi_1.default.object({
    quantity: joi_1.default.number().required(),
    inStock: joi_1.default.boolean().required()
});
// Main Product Joi schema
const productJoiSchema = joi_1.default.object({
    name: joi_1.default.string().trim().required().messages({
        'any.required': 'Product name is required',
        'string.empty': 'Product name cannot be empty'
    }),
    description: joi_1.default.string().trim().required().messages({
        'any.required': 'A brief description is required',
        'string.empty': 'Description cannot be empty'
    }),
    price: joi_1.default.number().required().messages({
        'any.required': 'Price is required',
        'number.base': 'Price must be a number'
    }),
    category: joi_1.default.string().trim().required().messages({
        'any.required': 'Category is required',
        'string.empty': 'Category cannot be empty'
    }),
    tags: joi_1.default.array().items(joi_1.default.string().trim()).required().messages({
        'any.required': 'Tags are required',
        'array.base': 'Tags must be an array of strings'
    }),
    variants: joi_1.default.array().items(variantJoiSchema).required().messages({
        'any.required': 'Variants are required',
        'array.base': 'Variants must be an array of objects'
    }),
    inventory: inventoryJoiSchema.required().messages({
        'any.required': 'Inventory is required'
    }),
    isDelete: joi_1.default.boolean().required()
});
exports.default = productJoiSchema;
