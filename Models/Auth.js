import mongoose from "mongoose";
import { type } from "os";


const userscema=mongoose.Schema({
    email:{type: String,required:true},
    name:{type:String},
    desc:{type:String},
    joinedon:{type:Date,default:Date.now},
    points:{type: Number ,default:0},
    plan:{type: String,default:"Free"},
    timeLimit:{type:Number, default: 5}
})

export default mongoose.model("User",userscema)