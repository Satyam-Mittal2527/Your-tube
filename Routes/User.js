import express from "express"
import { login } from "../Controllers/Auth.js"
import { updatechanneldata,getallchannels } from "../Controllers/channel.js";
const routes=express.Router();

routes.post('/login',login)
routes.patch('/update/:id',updatechanneldata)
routes.get('/getallchannel',getallchannels)

export default routes;