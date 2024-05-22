import Joi from 'joi';

// Variant Joi schema
const variantJoiSchema = Joi.object({
    type: Joi.string().trim().required(),
    value: Joi.string().trim().required()
});

// Inventory Joi schema
const inventoryJoiSchema = Joi.object({
    quantity: Joi.number().required(),
    inStock: Joi.boolean().required()
});

// Main Product Joi schema
const productJoiSchema = Joi.object({
    name: Joi.string().trim().required().messages({
        'any.required': 'Product name is required',
        'string.empty': 'Product name cannot be empty'
    }),
    description: Joi.string().trim().required().messages({
        'any.required': 'A brief description is required',
        'string.empty': 'Description cannot be empty'
    }),
    price: Joi.number().required().messages({
        'any.required': 'Price is required',
        'number.base': 'Price must be a number'
    }),
    category: Joi.string().trim().required().messages({
        'any.required': 'Category is required',
        'string.empty': 'Category cannot be empty'
    }),
    tags: Joi.array().items(Joi.string().trim()).required().messages({
        'any.required': 'Tags are required',
        'array.base': 'Tags must be an array of strings'
    }),
    variants: Joi.array().items(variantJoiSchema).required().messages({
        'any.required': 'Variants are required',
        'array.base': 'Variants must be an array of objects'
    }),
    inventory: inventoryJoiSchema.required().messages({
        'any.required': 'Inventory is required'
    }),
    isDelete: Joi.boolean().required()
});

export default productJoiSchema;
