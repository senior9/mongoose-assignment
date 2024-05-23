import { NextFunction, Request, Response } from "express";
import { ProductServices } from "./product.service";
import productJoiSchema from "./product.validation";



const createProduct = async (req: Request, res: Response) => {
    try {
        // Extract product data from request body
        const { product: productData } = req.body;

        // Validate product data using Joi schema
        const { error, value } = productJoiSchema.validate(productData);

        // If validation fails, send detailed error response
        if (error) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: error.details.map((detail) => ({
                    field: detail.context?.key || 'unknown',
                    message: detail.message
                }))
            });
        }

        // Call controller to create product
        const result = await ProductServices.createProductIntoDb(value);

        // Respond with success message and created product data
        res.status(200).json({
            success: true,
            message: 'Product created successfully',
            data: result
        });
    } catch (error: any) {
        // Send generic error message in case of unexpected errors
        res.status(500).json({
            success: false,
            message: error.message || 'An error occurred',
            error: error
        });
    }
};


//  Retrieve a List of All Products

const getAllProducts = async (req: Request, res: Response) => {
    try {
        // Check if there are any query parameters
        if (Object.keys(req.query).length > 0) {
            // If query parameters exist, use them to filter products
            // For example, let's assume you have a query parameter named 'category'
            const  name  = req.query.searchTerm;
            console.log(name);
            const result = await ProductServices.getProductsByCategoryFromDb(name);
            return res.status(200).json({
                success: true,
                message: "Products fetched successfully!",
                data: result
            });
        } else {
            // If no query parameters, return all products
            const result = await ProductServices.getAllProductsFromDb();
            return res.status(200).json({
                success: true,
                message: "All products fetched successfully!",
                data: result
            });
        }
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message || "Something went wrong",
            error: error
        });
    }
}

// Retrieve a Specific Product by ID
const getProductId = async (req: Request, res: Response) => {

    try {
        const { productId } = req.params;
        const result = await ProductServices.getProductIdFromDb(productId);
        res.status(200).json({
            succuess: true,
            message: "Product fetched successfully!",
            data: result
        })

    } catch (error) {
        console.log(error)
    }
}

// Update Product Information
const updatedProduct = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;
        const productData = req.body;

        const result = await ProductServices.updateProductFromDb(productId, productData);

        res.status(200).json({
            success: true,
            message: "Product updated successfully!",
            data: result
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || "something went wrong",
            error: error
        })
    }
}


// Delete Product 
const deleteProduct = async (req: Request, res: Response) => {

    try {
        const { productId } = req.params;
        const result = await ProductServices.deleteProducFromDb(productId);
        res.status(200).json({
            succuess: true,
            message: "Product Deleted successfully!",
            data: result
        })

    } catch (error) {
        console.log(error)
    }
}





export const ProductControllers = {
    createProduct,
    getAllProducts,
    getProductId,
    updatedProduct,
    deleteProduct,
}