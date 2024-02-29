import cloudinary from "cloudinary"

cloudinary({
  cloud_name: "dcbcf1jtk",
  api_key: "449196468941497",
  api_secret: "a1xpaCZlma3d-wzF_Dqk0sAVsso",
})

module.exports = async (file) => {
  try {
    const res = await cloudinary.v2.uploader.upload(file)
    return res.secure_url
  } catch (error) {
    return error
  }
}
