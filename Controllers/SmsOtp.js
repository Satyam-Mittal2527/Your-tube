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
    client.messages
      .create({
        body: `${otp}`,
        from: "+19207893050",
        to: `${phone}`,
      })
      .then((message) => console.log(message.sid));
    res
      .status(200)
      .json({ message: "Otp sent successfully", otp : otp});
  } catch (error) {
    res.json(400).json("Error sms", error);
  }
};
