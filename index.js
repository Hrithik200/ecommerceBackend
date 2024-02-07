const express = require("express");
const dbConnect = require("./config/dbConnect");
require("dotenv").config();

const authRouter = require("./routes/authRoute");
const productRouter=require("./routes/productRoute");

const bodyParser = require("body-parser");
const { notFound, errorHandler } = require("./middlewares/errorHandler");

const app = express();
const PORT = 3000;
const cookieParser=require("cookie-parser")
const morgan=require("morgan")
dbConnect();

app.use(morgan("dev"))
//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

//routes
app.use("/api/user", authRouter);
app.use("/api/product", productRouter);

// error handler
app.use(notFound)
app.use(errorHandler)
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
