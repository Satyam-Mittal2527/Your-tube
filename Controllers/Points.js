import users from "../Models/Auth.js";
import mongoose from "mongoose";

export const Pointcontroller = async (req, res) => {
    // console.log("Reached here");

    const { id: _id } = req.params;
    // console.log("_id:", _id);

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("User unavailable... Invalid ID");
    }

    try {
        const User= await users.findById(_id);
        console.log(User.email)
        const Points= User.points;
        const UpdatePoints=  await users.findByIdAndUpdate(
            _id,{
                $set:{points: Points+5}
            }
        );
        console.log(User.points)
        res.status(200).json(UpdatePoints)
        return
    } catch (error) {
        // console.error("Error during points increment:", error);
        res.status(400).json({ error: "Error in points increment" });
        return
    }
};
export const getPoints = async (req, res) => {
    // console.log("Reached getPoints function");

    try {
        const Points = await users.find();

        if (Points.length === 0) {
            return res.status(404).json({ error: "No points data available" });
        }

        res.status(200).json(Points);
    } catch (error) {
        console.error("Error fetching points:", error);
        res.status(400).json({ error: "Error fetching points" });
    }
};
