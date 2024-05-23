import express, { Application, NextFunction, Request, Response } from 'express';
import cors from "cors";
import { productRoutes } from './app/model/product/product.route';


const app: Application = express();

// Parser
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
// application Routes 

app.use('/api', productRoutes)
// app.use('/api/orders', orderRoutes)
// 404 handler for unknown routes
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ message: 'Route not found' });
});

export default app;
