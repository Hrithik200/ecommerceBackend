const express = require("express");
const dbConnect = require("./config/dbConnect");
require("dotenv").config();
const authRouter = require("./routes/authRoute");
const bodyParser = require("body-parser");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
dbConnect();
const app = express();
const PORT = 3000;
const cookieParser=require("cookie-parser")

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

//routes
app.use("/api/user", authRouter);

// error handler
app.use(notFound)
app.use(errorHandler)
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
