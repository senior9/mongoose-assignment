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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductServices = void 0;
const mongoose_1 = require("mongoose");
const product_model_1 = require("./product.model");
const createProductIntoDb = (products) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(product);
    try {
        const result = yield product_model_1.ProductModel.create(products);
        return { success: true, data: result };
    }
    catch (error) {
        return { success: false, message: error.message, error };
    }
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
// Update Product Information
const updateProductFromDb = (productId, productData) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Update data:', productData); // Log the data to be updated
    console.log('Product Id  :', productId); // Log the data to be updated
    const result = yield product_model_1.ProductModel.findByIdAndUpdate(productId, { $set: productData }, { new: true, runValidators: true });
    if (!result) {
        throw new mongoose_1.Error('Product not found');
    }
    console.log('Update result:', result); // Log the result of the update
    return result;
});
// delete Product 
const deleteProducFromDb = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.updateOne({ _id }, { isDelete: true });
    return result;
});
// Retrieve Products by Category from DB
const getProductsByCategoryFromDb = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.find({ name: { $regex: new RegExp(name, 'i') } });
    return result;
});
exports.ProductServices = {
    createProductIntoDb,
    getAllProductsFromDb,
    getProductIdFromDb,
    updateProductFromDb,
    deleteProducFromDb,
    getProductsByCategoryFromDb,
};
