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
exports.ProductControllers = void 0;
const product_service_1 = require("./product.service");
const product_validation_1 = __importDefault(require("./product.validation"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract product data from request body
        const { product: productData } = req.body;
        // Validate product data using Joi schema
        const { error, value } = product_validation_1.default.validate(productData);
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
        // Call controller to create product
        const result = yield product_service_1.ProductServices.createProductIntoDb(value);
        // Respond with success message and created product data
        res.status(200).json({
            success: true,
            message: 'Product created successfully',
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
//  Retrieve a List of All Products
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_service_1.ProductServices.getAllProductsFromDb();
        res.status(200).json({
            succuess: true,
            message: "Products fetched successfully!",
            data: result
        });
    }
    catch (error) {
        res.status(500).json({
            succuess: false,
            message: error.message || "something went wrong",
            error: error
        });
    }
});
// Retrieve a Specific Product by ID
const getProductId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.ProductServices.getProductIdFromDb(productId);
        res.status(200).json({
            succuess: true,
            message: "Product fetched successfully!",
            data: result
        });
    }
    catch (error) {
        console.log(error);
    }
});
//  Update Product Information
const updatedProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.id;
        const productData = req.body;
        const updatedProduct = yield product_service_1.ProductServices.updateProductFromDb(productId, productData);
        res.status(200).json(updatedProduct);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.ProductControllers = {
    createProduct,
    getAllProducts,
    getProductId,
    updatedProduct,
};
