const cloudinary = require("cloudinary").v2;
// .v2 zaroori hai — yeh latest version hai

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    // ✅ CLOUD_NAME → CLOUDINARY_CLOUD_NAME
    api_key: process.env.CLOUDINARY_API_KEY,
    // ✅ yeh sahi tha
    api_secret: process.env.CLOUDINARY_API_SECRET,
    // ✅ CLOUDINARY_SECRET_KEY → CLOUDINARY_API_SECRET
});

module.exports = cloudinary;