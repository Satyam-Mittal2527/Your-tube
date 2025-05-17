"use strict";
import multer from "multer";
const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, "invoice");
    },
    filename: (req, file, cb) => {
        cb(null,
            new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
        );
    },
});
const filefilter = (req,file, cb) => {
    // console.log("File type",file)
    if (file.mimetype === "application/pdf") {
        cb(null, true)
    } else {
        cb(null, false)
    }
}
const  invoice= multer({ storage: storage, fileFilter: filefilter });
export default invoice