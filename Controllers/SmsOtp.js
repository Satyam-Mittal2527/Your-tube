import twilio from "twilio";

export const smsOtp = async (req, res) => {
    const {phone} = req.body;
  const accountSid =process.env.accountSid;
  const authToken = process.env.authToken;
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
