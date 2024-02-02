
const mongoose = require("mongoose");
const uri = "mongodb+srv://hrithiktechky:hrithiktechky@cluster0.zsxqft9.mongodb.net/ecommercebackend";

const dbConnect = () => { mongoose
        .connect(uri)
        .then(() => console.log("Mongo DB connected Success"))
        .catch((error) => console.log("Mongo DB Connected Failed", error.message));
};
module.exports=dbConnect;
