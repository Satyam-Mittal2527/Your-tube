import nodemailer from "nodemailer";
export const LoginMail = async (req, res) => {
  try {
    const { email } = req.body;
    // console.log("Mailer receipient email", email);
    const otp = Math.floor(Math.random() * 100000);
    // console.log(otp);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        user: "mittal.satyam646@gmail.com",
        pass: "srlj rmlf whqc opxk",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    const info = await transporter.sendMail({
      from: '"The Vidzy Team" <mittal.satyam646@gmail.com>',
      to: email,
      subject: "Login Successfull",
      text: `
Dear Customer,

We are pleased to inform you that you have logined to Vidzy. 
Your Otp is ${otp}.
Thank you for choosing our platform.

If you have any questions or need further assistance, feel free to reach out to our support team.

Best regards,
The Vidzy Team
  `,
      html: `
<h1>Dear Customer,</h1>
<p>We are pleased to inform you that you have logined to Vidzy. Thank you for choosing our platform.</p>
<h1>Your otp is ${otp}</h1>
<p>If you have any questions or need further assistance, feel free to reach out to our support team.
Kindly Reply to this mail, of not you</p>
<p>Best regards,</p>
<p>The Vidzy Team</p>
  `,
    });
    res.status(200).json({ OtpCode: otp });
  } catch (error) {
    console.log("Error mailing", error);
    res.status(400).json("Error triggering");
  }
};
