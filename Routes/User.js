import express from "express"
import { login } from "../Controllers/Auth.js"
import { updatechanneldata,getallchannels } from "../Controllers/channel.js";
import { PlanController } from "../Controllers/Plan.js";
import { LoginMail } from "../Controllers/MailLogin.js";
import { mailOtp } from "../Controllers/MailOtp.js";
import {smsOtp} from "../Controllers/SmsOtp.js";
import invoice from "../Helper/invoice.js";
const routes=express.Router();
routes.post('/SmsOtp',smsOtp)
routes.post('/OtpLogin',mailOtp)
routes.post('/login',login)
routes.post('/TriggerMail',LoginMail)
routes.patch('/update/:id',updatechanneldata)
routes.get('/getallchannel',getallchannels)
routes.patch('/Plan/:id',invoice.single("file"),PlanController)
export default routes;