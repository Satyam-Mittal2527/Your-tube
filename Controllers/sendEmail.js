import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Get __dirname in ES Modules
try {
  const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
} catch (error) {
  console.log("dict",error)
}


export const sendEmail = async (req, res) => {
  try {
    const { to } = req.body;
    console.log(to)
    const pdfPath = path.join(__dirname, "Inv", `${to}.pdf`);

    // Check if the file exists before trying to send it
    if (!fs.existsSync(pdfPath)) {
      return res.status(404).json({ error: "Invoice PDF not found" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        user: "mittal.satyam646@gmail.com",
        pass: "srlj rmlf whqc opxk", // Use environment variable in production!
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const info = await transporter.sendMail({
      from: '"The Vidzy Team" <mittal.satyam646@gmail.com>',
      to,
      subject: "Payment Confirmation for Vidzy",
      text: `
Dear Customer,

We are pleased to inform you that your payment for Vidzy has been successfully completed. Thank you for choosing our platform.

If you have any questions or need further assistance, feel free to reach out to our support team.

Best regards,
The Vidzy Team
      `,
      html: `
<h1>Payment Successful</h1>
<p>Dear Customer,</p>
<p>We are pleased to inform you that your payment for Vidzy has been successfully completed. Thank you for choosing our platform.</p>
<p>If you have any questions or need further assistance, feel free to reach out to our support team.</p>
<p>Best regards,<br>The Vidzy Team</p>
      `,
      attachments: [
        {
          filename: `${to}.pdf`,
          path: pdfPath,
          contentType: "application/pdf",
        },
      ],
    });

    console.log("Message sent:", info.messageId);
    res.status(200).json({ message: "Email sent", id: info.messageId });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
};
