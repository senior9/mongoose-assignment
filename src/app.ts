import express, { Application } from 'express';
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

// app.get('/',);

export default app;
