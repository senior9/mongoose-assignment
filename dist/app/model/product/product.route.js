"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const router = express_1.default.Router();
router.post('/products', product_controller_1.ProductControllers.createProduct);
router.get('/products', product_controller_1.ProductControllers.getAllProducts);
router.get('/products/:productId', product_controller_1.ProductControllers.getProductId);
router.put('/products/:productId', product_controller_1.ProductControllers.updatedProduct);
router.delete('/products/:productId', product_controller_1.ProductControllers.deleteProduct);
exports.productRoutes = router;
