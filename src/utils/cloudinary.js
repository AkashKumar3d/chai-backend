import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";


//  configure the cloudinary service
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: CLOUDINARY_API_SECRET
});


// create a  custom method for file save on cloudinary server 
const uploadonCloudinary = async (localFilePath)=>{
     try {
          if (!localFilePath) return null;
          const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
          })
          console.log("file uploaded Successfuly", response.url)
          return response
     } catch (err) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file  as the upload if the upload fails  
     }
}

export { uploadonCloudinary }