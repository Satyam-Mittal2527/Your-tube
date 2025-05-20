import users from "../Models/Auth.js";
import jwt from "jsonwebtoken";
import axios from "axios";
import nodemailer from "nodemailer"
export const login = async (req, res) => {
  const { email } = req.body;
  // console.log(email)
  try {
    const extinguser = await users.findOne({ email });
    if (!extinguser) {
      try {
        const newuser = await users.create({ email });
        const token = jwt.sign(
          {
            email: newuser.email,
            id: newuser._id,
            points: newuser.points,
          },
          process.env.JWT_SECERT,
          {
            expiresIn: "1h",
          }
        );


        res.status(200).json({ result: newuser, token });
      } catch {
        res.status(500).json({ mess: "something went wrong...." });
        return;
      }
    } else {
        const token =jwt.sign({
            email: extinguser.email,id:extinguser._id,points: extinguser.points,
        },process.env.JWT_SECERT,{
            expiresIn:"1h"
        }
        )
        // console.log("User points in DB:", extinguser.points);
      res.status(200).json({ result: extinguser, token});
    }
  } catch (error) {
    res.status(500).json({ mess: "something went wrong....",error});
    return;
  }
};
