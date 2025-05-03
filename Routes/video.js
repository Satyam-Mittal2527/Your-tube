import express from "express";
import { likedcontroller } from "../Controllers/like.js";
import { viewscontroller } from "../Controllers/views.js";
import { uploadvideo, getallvideos } from "../Controllers/video.js";
import {
  likedvideocontroller,
  deletelikedvideo,
  getalllikedvideo,
} from "../Controllers/likedvideo.js";
import upload from "../Helper/filehelper.js";
import auth from "../middleware/auth.js";
import {
  watchlatercontroller,
  getallwatchlatercontroller,
  deletewatchlater,
} from "../Controllers/watchlater.js";
import {
  historycontroller,
  getallhistorycontroller,
  deletehistorycontroller,
} from "../Controllers/History.js";
const routes = express.Router();

routes.post("/uploadvideo", auth, upload.single("file"), uploadvideo);

routes.get("/getvideos", getallvideos);
routes.patch("/like/:id", auth, likedcontroller);
routes.patch("/views/:id", viewscontroller);

routes.post("/history", historycontroller);
routes.get("/getallhistory", getallhistorycontroller);
routes.delete("/deletehistory/:userid", deletehistorycontroller);

routes.post("/watchlater", auth, watchlatercontroller);
routes.get("/getallwatchlater", getallwatchlatercontroller);
routes.delete("/deletewatchlater/:videoid/:viewer", auth, deletewatchlater);

routes.post("/likedvideo", auth, likedvideocontroller);
routes.get("/getalllikedvideo", getalllikedvideo);
routes.delete("/deletelikedvideo/:videoid/:viewer", auth, deletelikedvideo);

export default routes;
