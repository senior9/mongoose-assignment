"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const product_route_1 = require("./app/model/product/product.route");
const app = (0, express_1.default)();
// Parser
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// application Routes 
app.use('api', product_route_1.productRoutes);
// app.use('/api/orders', orderRoutes)
// app.get('/',);
exports.default = app;
