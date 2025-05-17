import Likedvideo from "../Models/likedvideo.js";


export const likedvideocontroller = async (req, res) => {
  const likedvideodata = req.body;
  const likedvideo = new Likedvideo(likedvideodata);
  try {
    await likedvideo.save();
    res.status(200).json("added to watch later");
  } catch (error) {
    res.status(400).json(error);
    return;
  }
};

export const getalllikedvideo = async (req, res) => {
  try {
    const files = await Likedvideo.find();
    res.status(200).send(files);
  } catch (error) {
    res.status(400).json(error);
    return;
  }
};

export const deletelikedvideo = async (req, res) => {
  const { videoid: videoid, viewer: viewer } = req.params;
  try {
    await Likedvideo.findOneAndDelete({
      videoid: videoid,
      viewer: viewer,
    })
    res.status(200).json({ message: "removed from the liked video" });
  } catch (error) {
    res.status(400).json(error);
    return;
  }
};
