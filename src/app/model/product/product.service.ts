
import { ProductModel } from "./product.model";
import { Tproduct, TproductUpdate } from "./product.type";



const createProductIntoDb = async (product: Tproduct) => {
    const result = await ProductModel.create(product);
    return result;
}

// get Product from db 
const getAllProductsFromDb = async ()=>{
    const result = await ProductModel.find();
    return result ;
}

// Retrieve a Specific Product by ID

const getProductIdFromDb = async (_id:string)=>{
    const result = await ProductModel.findOne({_id});
    return result ;
}

// Update Product Information
const updateProductFromDb = async (productId: string, productData:Partial<TproductUpdate>) => {

    const result = await ProductModel.findByIdAndUpdate(productId, {$set:productData}, { new: true});
    if (!result) {
        throw new Error('Product not found');
    }
    return result;
}

// delete Product 

const deleteProducFromDb = async (_id:string)=>{
    const result = await ProductModel.updateOne({_id},{isDelete:true});
    return result ;
}


// Retrieve Products by Category from DB
const getProductsByCategoryFromDb = async (name: string) => {
    const result = await ProductModel.find({ name: name });
    return result;
}

export const ProductServices = {
    createProductIntoDb,
    getAllProductsFromDb,
    getProductIdFromDb,
    updateProductFromDb,
    deleteProducFromDb,
    getProductsByCategoryFromDb,
};