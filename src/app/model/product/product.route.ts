import  express  from "express";
import { ProductControllers } from "./product.controller";

const router = express.Router();
router.post('/products', ProductControllers.createProduct);

router.get('/products/:productId',ProductControllers.getProductId);
router.put('/products/:productId',ProductControllers.updatedProduct);
router.delete('/products/:productId',ProductControllers.deleteProduct);
router.get('/products', ProductControllers.getAllProducts);


export const  productRoutes = router;