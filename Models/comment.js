import mongoose from "mongoose";
import { type } from "os";
const commentschema= mongoose.Schema({
     videoid:String,
     userid:String,
     commentbody: String,
     usercommented: String,
     commenton:{ type: Date,default: Date.now},
     dislike:{type: Number,default: 0},
     Like: {type: Number,default:0},
     Language : {type: String , default: "eng"},
     city : {type: String , default: "UnKnown"}

})
export default mongoose.model("Comment",commentschema)