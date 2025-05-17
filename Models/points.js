import mongoose from "mongoose";
import { type } from "os";

const pointScehma= mongoose.Schema({
    points: {type:Number, default:0}
})

export default mongoose.model("Points",pointScehma)