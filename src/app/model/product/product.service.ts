
import { Error } from "mongoose";
import { ProductModel } from "./product.model";
import { Tproduct, TproductUpdate } from "./product.type";



const createProductIntoDb = async (products:Tproduct) => {
    // console.log(product);
    try {
        const result = await ProductModel.create(products);
        return { success: true, data: result };
    } catch (error:any) {
        return { success: false, message: error.message, error };
    }
    
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


    console.log('Update data:', productData); // Log the data to be updated
    console.log('Product Id  :', productId); // Log the data to be updated
    const result = await ProductModel.findByIdAndUpdate(productId, {$set:productData}, { new: true, runValidators: true});
    if (!result) {
        throw new Error('Product not found');
    }
    console.log('Update result:', result); // Log the result of the update
    return result;
}

// delete Product 

const deleteProducFromDb = async (_id:string)=>{
    const result = await ProductModel.updateOne({_id},{isDelete:true});
    return result ;
}


// Retrieve Products by Category from DB
const getProductsByCategoryFromDb = async (name: string) => {
    const result = await ProductModel.find({ name: { $regex: new RegExp(name, 'i') } });
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