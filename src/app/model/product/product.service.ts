import { ProductModel } from "./product.model";
import { Tproduct } from "./product.type";



const createProductIntoDb = async (product: Tproduct) => {
    const result = await ProductModel.create(product);
    return result;
}

// get Product from db 
const getAllProductsFromDb = async ()=>{
    const result = await ProductModel.find();
    return result ;
}


export const ProductServices = {
    createProductIntoDb,
    getAllProductsFromDb,
};