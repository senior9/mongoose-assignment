import Joi from 'joi';
// Create a Joi schema for order validation
const orderValidationSchema = Joi.object({
    email: Joi.string().email().trim().required(),
    productId: Joi.string().trim().required(),
    price: Joi.number().required(),
    quantity: Joi.number().integer().min(1).required()
});
export default orderValidationSchema;