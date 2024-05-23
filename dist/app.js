"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const product_route_1 = require("./app/model/product/product.route");
const order_route_1 = require("./app/model/order/order.route");
const app = (0, express_1.default)();
// Parser
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
// application Routes 
app.use('/api', product_route_1.productRoutes); //Product Routes
app.use('/api', order_route_1.orderRoutes); //Order Routes
// 404 handler for unknown routes
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});
exports.default = app;
