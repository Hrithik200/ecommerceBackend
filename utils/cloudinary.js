const cloudinary = require("cloudinary");

cloudinary.config({
    cloud_name: "dheccbosc",
    api_key: "488833459539255",
    api_secret: "4LYp6lLNE1vsWEz-FrlkroAKJZ8",
});

const cloudinaryUploadImg = async (fileToUploads) => {
    console.log("In the Cloudinary Utils Files");
    return new Promise((resolve) => {
        cloudinary.uploader.upload(fileToUploads, (result) => {
            resolve(
                {
                    url: result.secure_url,
                },
                {
                    resource_type: "auto",
                }
            );
        });
    });
};

module.exports = cloudinaryUploadImg;
