import { ProductModel } from "./product.model";
import { Tproduct } from "./product.type";



const createProductIntoDb = async (product: Tproduct) => {
    const result = await ProductModel.create(product);
    return result;
}

export const ProductServices = {
    createProductIntoDb,
};