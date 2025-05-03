import mongoose from "mongoose";
const commentschema= mongoose.Schema({
     videoid:String,
     userid:String,
     commentbody: String,
     usercommented: String,
     commenton:{ type: Date,default: Date.now}
})
export default mongoose.model("Comment",commentschema)