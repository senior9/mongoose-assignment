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
exports.OrderControllers = void 0;
const order_validation_1 = __importDefault(require("./order.validation"));
const order_service_1 = require("./order.service");
const joi_1 = __importDefault(require("joi"));
const product_service_1 = require("../product/product.service");
const mongoose_1 = __importDefault(require("mongoose"));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract order data from request body
        const orderData = req.body;
        // Validate product data using Joi schema
        const { error, value } = order_validation_1.default.validate(orderData);
        // If validation fails, send detailed error response
        if (error) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: error.details.map((detail) => {
                    var _a;
                    return ({
                        field: ((_a = detail.context) === null || _a === void 0 ? void 0 : _a.key) || 'unknown',
                        message: detail.message
                    });
                })
            });
        }
        // Validate if productId is a valid ObjectId
        if (!mongoose_1.default.Types.ObjectId.isValid(value.productId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID format"
            });
        }
        // product is available and update inventory
        const product = yield product_service_1.ProductServices.getProductIdFromDb(value.productId);
        if (!product) { //validation
            return res.status(404).json({
                success: false,
                message: "order not found"
            });
        }
        // check the order quantity excedd from aviable quantity 
        if (value.quantity > product.inventory.quantity) {
            return res.status(400).json({
                success: false,
                message: "Insufficient quantity available in inventory "
            });
        }
        //Update quantiy
        const updateQuantity = product.inventory.quantity - value.quantity;
        //  inStock status
        let inStock = updateQuantity > 0;
        // Set inStock to false if the inventory quantity reaches zero
        if (updateQuantity === 0) {
            inStock = false;
        }
        //update DataBAse 
        yield product_service_1.ProductServices.updateProductFromDb(value.productId, {
            inventory: {
                quantity: updateQuantity,
                inStock: inStock
            }
        });
        // Call controller to create Order
        const result = yield order_service_1.OrderServices.createOrderIntoDb(value);
        // Respond with success message and created Order data
        res.status(200).json({
            success: true,
            message: 'Order created successfully',
            data: result
        });
    }
    catch (error) {
        // Send generic error message in case of unexpected errors
        res.status(500).json({
            success: false,
            message: error.message || 'An error occurred',
            error: error
        });
    }
});
//Get all Order and fetch query parameter by email
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const emailSchema = joi_1.default.string().email().required();
        // Check if there are any query parameters
        if (Object.keys(req.query).length > 0) {
            //Email validation 
            const { error } = emailSchema.validate(req.query.email);
            if (error) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid email format.",
                    error: error.details[0].message
                });
            }
            // If query parameters exist, use them to filter products
            const email = req.query.email;
            // console.log(email);
            const result = yield order_service_1.OrderServices.getOrdersByCategoryFromDb(email);
            if (result.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Email not found in the order database."
                });
            }
            return res.status(200).json({
                success: true,
                message: "OrderItem  fetched By Email successfully!",
                data: result
            });
        }
        else {
            // If no query parameters, return all products
            const result = yield order_service_1.OrderServices.getAllOrderFromDb();
            return res.status(200).json({
                success: true,
                message: "All order inventory fetched successfully!",
                data: result
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Something went wrong",
            error: error
        });
    }
});
// Export Function
exports.OrderControllers = {
    createOrder,
    getAllOrders,
};
