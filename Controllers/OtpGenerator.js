import axios from 'axios';

export const Otp = async (req, res) => {
  const { email } = req.body;
  const {phone} = req.body
  const cities = ["Tamil Nadu", "Kerala", "karnataka", "Andhra", "Telungana"];
  // let condition = false;
  const ip = req.ip;
  try {
    const response = await axios.get(`http://ip-api.com/json`);
    console.log(response);
    // if (cities.map(c => c.toLowerCase()).includes(response.data.regionName.toLowerCase())) {
    //   condition = true;
    // }
    let responseOtp = 0;
    responseOtp = await axios.post("https://your-tube-ovhq.onrender.com/user/TriggerMail", {
        email,
    });
    console.log("Returned Otp Code:", responseOtp.data.OtpCode);
    // condition = true;
    res.status(200).json({OtpCode : responseOtp.data.OtpCode})
    
  } catch (error) {
    console.log("again Otp error:",error)
    res.status(400).json({error})
  }
};
