import videofile from "../Models/videofile.js";
export const uploadvideo=async(req,res)=>{
    if(req.file=== undefined){
        res.status(404).json({message:"plz upload a mp.4 video file only"})
    }else{
        try {
            const file=new videofile({
                videotitle:req.body.title,
                filename:req.file.originalname,
                filepath:req.file.path,
                filetype:req.file.mimetype,
                filesize:req.file.size,
                videochannel:req.body.channel,
                uploader:req.body.uploader,
            })
            await file.save()
            res.status(200).send("File uploaded successfully")
        } catch (error) {
            console.error("Error saving file:", error);
            res.status(500).json({ message: "Error saving file", error: error.message });
        }
        
    }
}

export const getallvideos=async(req,res)=>{
    try {
        const files=await videofile.find();
        res.status(200).send(files)
    } catch (error) {
        res.status(404).json(error.message)
            return
    }
}