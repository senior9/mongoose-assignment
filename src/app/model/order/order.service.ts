import { OrderModel } from "./order.model";
import Torder from "./order.type";


// Create Order
const createOrderIntoDb = async (order: Torder) => {
    const result = await OrderModel.create(order);
    return result;
}


// Get All order
const getAllOrderFromDb = async ()=>{
    const result = await OrderModel.find();
    return result ;
}

// Retrieve Orders by Category from DB
const getOrdersByCategoryFromDb = async (email: string) => {
    const result = await OrderModel.find({ email: email });
    return result;
}

export const OrderServices ={
    createOrderIntoDb,
    getAllOrderFromDb,
    getOrdersByCategoryFromDb,
}