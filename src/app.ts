import express, { Application, NextFunction, Request, Response } from 'express';
import cors from "cors";
import { productRoutes } from './app/model/product/product.route';
import { orderRoutes } from './app/model/order/order.route';


const app: Application = express();

// Parser
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
// application Routes 

app.use('/api', productRoutes) //Product Routes


app.use('/api', orderRoutes) //Order Routes

// 404 handler for unknown routes
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ message: 'Route not found' });
});

export default app;
