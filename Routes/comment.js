import express from "express";

import {
  postcomment,
  getcomment,
  deletecomment,
  editcomment,
} from "../Controllers/Comment.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.post("/post", auth, postcomment);
router.get("/get", auth, getcomment);
router.delete("/delete", deletecomment);
router.patch("/edit/:id", auth, editcomment);

export default router
