import Joi from 'joi';
import mongoose from 'mongoose';
// Create a Joi schema for order validation
const orderValidationSchema = Joi.object({
    productId: Joi.string().custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
            return helpers.error("any.invalid");
        }
        return value;
    }, "ObjectId Validation").required(),
    email: Joi.string().email().trim().required(),
    price: Joi.number().required(),
    quantity: Joi.number().integer().min(1).required()
});
export default orderValidationSchema;