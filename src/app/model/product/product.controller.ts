import { Request, Response } from "express";
import { ProductServices } from "./product.service";



//  creat new student 
const createProduct = async (req: Request, res: Response) => {
    try {
        // creating Schema validation using Zod

        const { product: productData } = req.body;

        // controller calling 

        const result = await ProductServices.createProductIntoDb(productData);

        // respond send 
        res.status(200).json({
            succuess: true,
            message: "product create successfully",
            data: result
        })
    } catch (error: any) {
        res.status(500).json({
            succuess: true,
            message: error.message || "Typical mistake",
            error: error
        })
    }

}


export const ProductControllers ={
    createProduct,
}