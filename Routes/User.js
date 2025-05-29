import express from "express"
import { login } from "../Controllers/Auth.js"
import { updatechanneldata,getallchannels } from "../Controllers/channel.js";
import { PlanController } from "../Controllers/Plan.js";
import { LoginMail } from "../Controllers/MailLogin.js";
import { Otp } from "../Controllers/OtpGenerator.js";
import {smsOtp} from "../Controllers/SmsOtp.js";
import { PaymentController } from "../Controllers/Payment.js";
import { PayConfirmController } from "../Controllers/Payment.js";
import invoice from "../Helper/invoice.js";

const routes=express.Router();
routes.post('/SmsOtp',smsOtp)
routes.post('/OtpLogin',Otp)
routes.post('/login',login)
routes.post('/TriggerMail',LoginMail)
routes.patch('/update/:id',updatechanneldata)
routes.get('/getallchannel',getallchannels)
routes.patch('/Plan/:id',invoice.single("file"),PlanController)
routes.post('/Payment_order',PaymentController)
routes.get('/capture-order',PayConfirmController)
export default routes;