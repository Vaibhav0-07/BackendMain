import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
});


const uploadOnCloudinary = async (localFilePath) => { //can take time and can throw error too
    try {
        if(!localFilePath){
            return null;
        }
        //Uploading files on cloudinary 
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto",
        });
    }
    catch (error) {
        fs.unlinkSync(localFilePath); //to remove the locally uploaded file synchronously means first remove the file
        //then we will do any other work this is to prevent our server from malicious files.
        return null;
    }
}