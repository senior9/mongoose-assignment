import  express  from "express";
import { ProductControllers } from "./product.controller";

const router = express.Router();
router.post('/products', ProductControllers.createProduct);
router.get('/products', ProductControllers.getAllProducts);
// router.get('/products',ProductControllers.serachProduct);
router.get('/products/:productId',ProductControllers.getProductId);
router.put('/products/:productId',ProductControllers.updatedProduct);
router.delete('/products/:productId',ProductControllers.deleteProduct);



export const  productRoutes = router;