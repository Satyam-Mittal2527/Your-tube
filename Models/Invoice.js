import mongoose from "mongoose";
import { type } from "os";

const invoiceSchema= new mongoose.Schema({
    plan: {type:String, default:"Free"},
    Amount_Paid:{type:Number, default:0},
    Paid_on: {type:Date, default: Date.now},
    Paid_from: {type:String},
    Paid_to:{type:String},
    filepath:{type:String}
})

export default mongoose.model("Invoice",invoiceSchema)
