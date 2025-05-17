import express from "express";

import {
  postcomment,
  getcomment,
  deletecomment,
  editcomment,
  countDislike,
  Translate_comment,
  // Set_language,
  Like_comment
} from "../Controllers/Comment.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.post("/post", auth, postcomment);
router.get("/get", auth, getcomment);
router.delete("/delete/:id", deletecomment);
router.patch("/edit/:id", auth, editcomment);
router.get("/cmt_dislike/:id",countDislike);
router.post("/translate/:Language",Translate_comment);
// router.post("setLanguage/:id",Set_language)
router.get("/cmt_like/:id",Like_comment)
export default router
