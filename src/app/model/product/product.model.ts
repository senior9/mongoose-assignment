import { Schema, model } from "mongoose";
import { Tinventory, Tproduct, Tvariant } from "./product.type";


const variantSchema = new Schema <Tvariant>({ //Variant Schema 
    type: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    }

})


const inventorySchema = new Schema<Tinventory>({ //Inventory Schema 
    quantity: {
        type: Number,
        required: true
    },
    inStock: {
        type: Boolean,
        required: true
    }
})

// Main Product Model Schema 

const productSchema = new Schema<Tproduct>({
    name:{
        type:String,
        required:[true, "Product name is required"],
        trim:true
    },
    description:{
        type:String,
        required:[true, "A brief description is required"],
        trim:true
    },
    price:{
        type:Number,
        required:[true, "Price  is required"],
        trim:true
    },
    category: {
        type: String,
        required: [true, "Category is required"],
        trim: true
    },
    tags: {
        type: [String],
        required: true
    },
    variants:{
        type: [variantSchema],
        required:true
    },
    inventory:{
        type:inventorySchema,
        required:true
    },
    isDelete:{
        type:Boolean,
        default:false
    }
})


// Query middleware 
productSchema.pre('find',function(next){
    this.find({isDelete:{$ne:true}});
    next();
})
productSchema.pre('findOne',function(next){
    this.find({isDelete:{$ne:true}});
    next();
})



// Create Product Model 
export const ProductModel = model<Tproduct>('products',productSchema);

