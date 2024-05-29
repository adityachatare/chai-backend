import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.COULDINARY_CLOUD_NAME,
  api_key: process.env.COULDINARY_API_KEY,
  api_secret: process.env.COULDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //upload file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // file uploaded sucessfully
    console.log("File is uploaded on cloudinary", response.url);
    return response;
  } catch (err) {
    console.log(err);
    fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed
    return null;
  }
};

export default uploadOnCloudinary;
