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
exports.ProductControllers = void 0;
const product_service_1 = require("./product.service");
//  creat new student 
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // creating Schema validation using Zod
        const { product: productData } = req.body;
        // controller calling 
        const result = yield product_service_1.ProductServices.createProductIntoDb(productData);
        // respond send 
        res.status(200).json({
            succuess: true,
            message: "product create successfully",
            data: result
        });
    }
    catch (error) {
        res.status(500).json({
            succuess: true,
            message: error.message || "Typical mistake",
            error: error
        });
    }
});
exports.ProductControllers = {
    createProduct,
};
