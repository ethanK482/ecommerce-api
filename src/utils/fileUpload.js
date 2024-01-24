import dotenv from "dotenv";
dotenv.config();
import multer from "multer";
import cloudinaryPackage from "cloudinary";
import {CloudinaryStorage} from "multer-storage-cloudinary"
import envGetter from "../common/env/envGetter.js";


const ALLOW_FORMATS=["jpg","png","jpeg"]
const FOLDER_NAME="Ecommerce-api"
const cloudinary = cloudinaryPackage.v2;
// configure cloudinary
cloudinary.config({
    cloud_name :envGetter.getCloundinaryName(),
    api_key : envGetter.getCloundinarApiKey(),
    api_secret : envGetter.getCloundinarApiKey(),
})

//create storage engine for multer
// to save file receive from multer to cloudinary
const storage = new  CloudinaryStorage({
    cloudinary,
    allowedFormats:ALLOW_FORMATS,
    params : {
        folder : FOLDER_NAME,
    }
})
// init multer with storage engine
//to receive file
const upload = multer({
    storage
});

export default upload;