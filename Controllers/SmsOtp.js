import twilio from "twilio";

export const smsOtp = async (req, res) => {
    const {phone} = req.body;
    console.log(phone)
  const accountSid =process.env.accountSid;
  console.log(accountSid)
  const authToken = process.env.authToken;
  console.log(authToken)
  const client = twilio(accountSid, authToken);
  const otp = Math.floor(Math.random() * 100000);
  try {
    const message= await client.messages
      .create({
        body: `${otp}`,
        from: "+19207893050",
        to: `${phone}`,
      });

      console.log(message.sid);
      return res.status(200).json({ message: "Otp sent successfully", otp : otp});
  } catch (error) {
    return res.status(400).json("Error sms", error);
  }
};
