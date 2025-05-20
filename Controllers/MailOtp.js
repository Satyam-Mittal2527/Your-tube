import axios from 'axios';

export const mailOtp = async (req, res) => {
  const { email } = req.body;
  const {phone} = req.body
  const cities = ["Tamil Nadu", "Kerala", "karnataka", "Andhra", "Telungana"];
  let condition = false;
  const ip = req.ip;
  try {
    const response = await axios.get(`http://ip-api.com/json/27.34.65.70`);
    // console.log(response);
    if (cities.includes(response.data.city)) {
      condition = true;
    }
    let responseOtp = 0;
    if (condition) {
      responseOtp = await axios.post("http://localhost:5000/user/TriggerMail", {
        email,
      });
      // console.log("Returned Otp Code:", responseOtp.data.OtpCode);
      condition = true;
      res.status(200).json({OtpCode : responseOtp.data.OtpCode})
    }else{
        // console.log("Calling sms")
        responseOtp = await axios.post("http://localhost:5000/user/SmsOtp",{phone: phone})
        // console.log("responseOtp:",responseOtp.data.otp)
        res.status(200).json({OtpCode : responseOtp.data.otp})
    }
    
  } catch (error) {
    console.log("again Otp error:",error)
    res.status(400).json({error})
  }
};
