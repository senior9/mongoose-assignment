import { Request, Response } from "express";
import orderValidationSchema from "./order.validation";
import { OrderServices } from "./order.service";
import Joi from "joi";
import { ProductServices } from "../product/product.service";
import mongoose from "mongoose";




const createOrder = async (req: Request, res: Response) => {
    try {
        // Extract order data from request body
        const { order: orderData } = req.body;

        // Validate product data using Joi schema
        const { error, value } = orderValidationSchema.validate(orderData);

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

        // Validate if productId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(value.productId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID format"
            });
        }



        // product is available and update inventory
        const product = await ProductServices.getProductIdFromDb(value.productId)

        if (!product) { //validation
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        // check the order quantity excedd from aviable quantity 

        if (value.quantity > product.inventory.quantity) {
            return res.status(400).json({
                success: false,
                message: "Product out of stock "
            });
        }

        //Update quantiy
        const updateQuantity = product.inventory.quantity - value.quantity;

        //  inStock status
        let inStock = updateQuantity > 0;

         // Set inStock to false if the inventory quantity reaches zero
         if (updateQuantity === 0) {
            inStock = false;
        }

        //update DataBAse 
        await ProductServices.updateProductFromDb(value.productId,{
            inventory: {
                quantity: updateQuantity,
                inStock: inStock
            }
          })


        // Call controller to create Order
        const result = await OrderServices.createOrderIntoDb(value);

        // Respond with success message and created Order data
        res.status(200).json({
            success: true,
            message: 'Order created successfully',
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


//Get all Order and fetch query parameter by email

const getAllOrders = async (req: Request, res: Response) => {
    try {

        const emailSchema = Joi.string().email().required();
        // Check if there are any query parameters

        if (Object.keys(req.query).length > 0) {

            //Email validation 

            const { error } = emailSchema.validate(req.query.email);
            if (error) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid email format.",
                    error: error.details[0].message
                });
            }

            // If query parameters exist, use them to filter products
            const email: any = req.query.email;
            console.log(email);
            const result = await OrderServices.getOrdersByCategoryFromDb(email);
            if (result.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Email not found in the order database."
                });
            }
            return res.status(200).json({
                success: true,
                message: "OrderItem  fetched By Email successfully!",
                data: result
            });
        } else {
            // If no query parameters, return all products
            const result = await OrderServices.getAllOrderFromDb();
            return res.status(200).json({
                success: true,
                message: "All order inventory fetched successfully!",
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


// Export Function
export const OrderControllers = {
    createOrder,
    getAllOrders,
}