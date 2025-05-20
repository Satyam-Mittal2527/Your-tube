import twilio from "twilio";

export const smsOtp = async (req, res) => {
    const {phone} = req.body;
  const accountSid = "ACb65da0259e66e8c9e3096e7172988f8b";
  const authToken = "619e8b1175950bd7383937a8db87f0da";
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
