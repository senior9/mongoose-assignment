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
exports.ProductServices = void 0;
const product_model_1 = require("./product.model");
const product_validation_1 = __importDefault(require("./product.validation"));
const createProductIntoDb = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.create(product);
    return result;
});
// get Product from db 
const getAllProductsFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.find();
    return result;
});
// Retrieve a Specific Product by ID
const getProductIdFromDb = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.findOne({ _id });
    return result;
});
const updateProductFromDb = (productId, update) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = product_validation_1.default.validate(update);
    if (error) {
        throw new Error(error.details[0].message);
    }
    const updatedProduct = yield product_model_1.ProductModel.findByIdAndUpdate(productId, update, { new: true, runValidators: true });
    if (!updatedProduct) {
        throw new Error('Product not found');
    }
    return updatedProduct;
});
exports.ProductServices = {
    createProductIntoDb,
    getAllProductsFromDb,
    getProductIdFromDb,
    updateProductFromDb,
};
