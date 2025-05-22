import comment from "../Models/comment.js";
import mongoose from "mongoose";
import axios from "axios";
// import { TranslationServiceClient } from "@google-cloud/translate";
import { format } from "path";
export const postcomment = async (req, res) => {
  const commentdata = req.body;
  const postcomment = new comment(commentdata);
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  // console.log(ip)
  const response = await axios.get(`http://ip-api.com/json`)
  // console.log(response)
  const city = response.data.regionName;
  // console.log(city)
  postcomment.city= city;
  // console.log(postcomment)
  try {
    const saved=await postcomment.save();
    // console.log(saved)
    res.status(200).json(saved);
  } catch (error) {
    res.status(400).json(error.message);
    return;
  }
};

export const getcomment = async (req, res) => {
  try {
    const commentlist = await comment.find();
    res.status(200).json(commentlist);
  } catch (error) {
    res.status(400).json(error.message);
    return;
  }
};
export const deletecomment = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).send("Comments unavailable..");
  }
  try {
    await comment.findByIdAndDelete(_id);
    res.status(200).json({ message: "deleted comment" });
  } catch (error) {
    // console.log(error);
    res.status(400).json(error.message);
    return;
  }
};

export const editcomment = async (req, res) => {
  const { id: _id } = req.params;
  const { commentbody } = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).send("Comments unavailable..");
  }
  try {
    const updatecomment = await comment.findByIdAndUpdate(_id, {
      $set: { commentbody: commentbody },
    });
    res.status(200).json(updatecomment);
  } catch (error) {
    res.status(400).json(error.message);
    return;
  }
};

export const countDislike = async (req, res) => {
  const { id: _id } = req.params;
  // console.log(_id);
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).send("Comments unavailable..");
  }
  try {
    const dislike_comment = await comment.findById(_id);
    dislike_comment.dislike = dislike_comment.dislike + 1;
    console.log(dislike_comment)
    const Update_dislike = await comment.findByIdAndUpdate(_id, {
      $set: { dislike: dislike_comment.dislike },
    });
    if (dislike_comment.dislike === 2) {
      await comment.findByIdAndDelete(_id);
    }
    res.status(200).json("Deleted comment", dislike_comment);
  } catch (error) {
    // console.log(error)
    res.status(400).json(error.message);
  }
};
// export const Set_language = async(req,res) => {
//   const {id: _id} = req.params;
//   const {language} = req.body;
//    if (!mongoose.Types.ObjectId.isValid(_id)) {
//     return res.status(400).send("Comments unavailable..");
//   }
//   try {
//    const Language = await comment.findByIdAndUpdate(
//     _id, {
//       $set: Language= language,
//     }
//   )
//   res.status(200).json(Language) 
//   } catch (error) {
//     res.status(400).json({"Set Translation error: ":error.message})
//   }

// }
export const Translate_comment = async (req, res) => {
  // const { id: _id } = req.params;
  // console.log(req.body)
  const { lang } = req.body;
  // console.log(lang)
  // console.log(_id);
  // if (!mongoose.Types.ObjectId.isValid(_id)) {
  //   return res.status(400).send("Comments unavailable..");
  // }
  try {
    // const text = await comment.findById(_id);
    const {cmtbody} = req.body;
    // console.log(cmtbody)
    const encodedText = encodeURIComponent(cmtbody);
    const SourceLanguage = req.params.Language;
    // console.log(SourceLanguage)
    // console.log(comment_body);
    const url = `https://api.mymemory.translated.net/get?q=${encodedText}&langpair=${SourceLanguage}|${lang}`;
    const response = await axios.get(url);
    // console.log(response);
    const Translated_text = response.data.responseData.translatedText;
    return res.status(200).json(Translated_text);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

export const Like_comment = async (req, res) => {
  const { id: _id } = req.params;
  // console.log(_id);
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).send("Comments unavailable..");
  }
  try {
    const like_comment = await comment.findById(_id);
    like_comment.Like = like_comment.Like + 1;
    // console.log(like_comment)
    const Update_Like = await comment.findByIdAndUpdate(_id, {
      $set: { Like: like_comment.Like },
    });
    res.status(200).json(like_comment);
  } catch (error) {
    // console.log(error)
    res.status(400).json(error.message);
  }
};
