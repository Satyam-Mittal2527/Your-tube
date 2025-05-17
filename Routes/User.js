import express from "express"
import { login } from "../Controllers/Auth.js"
import { updatechanneldata,getallchannels } from "../Controllers/channel.js";
import { PlanController } from "../Controllers/Plan.js";
import invoice from "../Helper/invoice.js";
const routes=express.Router();

routes.post('/login',login)
routes.patch('/update/:id',updatechanneldata)
routes.get('/getallchannel',getallchannels)
routes.patch('/Plan/:id',invoice.single("file"),PlanController)
export default routes;