import mongoose from "mongoose";
import users from "../Models/Auth.js";
import Invoice from "../Models/Invoice.js";
import PDFdocument from "pdfkit";
import fs, { mkdirSync } from "fs";
import path from "path";
export const PlanController = async (req, res) => {
  const { id: _id } = req.params;
  const { plans } = req.body;
  const {email} = req.body;
  console.log("Email:",email)
  const TimeLimit = {
    Bronze: 7,
    Silver: 10,
    Gold: 10000,
  };
  const Amount = {
    Bronze: 10,
    Silver: 50,
    Gold: 100,
  };
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("User unavailable... Invalid ID");
  }

  try {
    const UpdatePlan = await users.findByIdAndUpdate(
      _id,
      {
        $set: {
          plan: plans,
          timeLimit: TimeLimit[plans],
        },
      },
      { new: true }
    );
    const invoiceFolder = "Inv";
    if (!fs.existsSync(invoiceFolder)) {
      fs.mkdirSync(invoiceFolder);
    }
    const filename = `${UpdatePlan.email}.pdf`;
    const filepath = path.join(invoiceFolder, filename);

    const doc = new PDFdocument();
    doc.pipe(fs.createWriteStream(filepath));
    doc.fontSize(20).text("Vidzy Payment Invoice", { align: "center" });
    doc.moveDown();
    doc.text(`Your Plan:${plans}`);
    doc.text(`Amount paid: ${Amount[plans]}`);
    doc.text(`Paid by:${UpdatePlan.email}`);
    doc.text("Paid to: The Vidzy Team");
    doc.text("Thank you for choosing Vidzy");
    doc.end();
    const file = new Invoice({
      plan: plans,
      Amount_Paid: Amount[plans],
      Paid_on: new Date(),
      Paid_from: UpdatePlan.email,
      Paid_to: "Vidzy Team",
      filepath: filepath,
    });
    //console.log(file);
    await file.save();
    console.log("File saved");
    console.log("Starting sending email");
    const Emailres = await fetch(
      "https://your-tube-ovhq.onrender.com/send-email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: email,
        }),
      }
    );
    const data = await Emailres.json();
    console.log(data);
    res.status(200).json(UpdatePlan);
    return;
  } catch (error) {
    console.log("Error saving file", error);
    res.status(404).json(error);
    return;
  }
};
