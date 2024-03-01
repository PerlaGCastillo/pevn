import cloudinary from 'cloudinary'
//import {v2 as cloudinary} from "cloudinary"

const cloudinary = require('cloudinary'.v2)

 cloudinary.config({
   cloud_name: dcbcf1jtk,
   api_key: 449196468941497,
   api_secret: a1xpaCZlma3d-wzF_Dqk0sAVsso,
})
  
// cloudinary.config({
//   cloud_name:process.env.CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_KEY,
//   api_secret:process.env.CLOUDINARY_SECRET
// });

module.exports = async (file) => {
  try {
    const res = await cloudinary.v2.uploader.upload(file)
    return res.secure_url
  } catch (error) {
    return error
  }
}
