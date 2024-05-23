import { Schema, model } from "mongoose";
import Torder from "./order.type";

// Define the schema for the order
const orderSchema = new Schema<Torder>({
    email: { type: String, required: true },
    productId: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
})


// create order model 
export const OrderModel = model<Torder>('OrderModel',orderSchema);
