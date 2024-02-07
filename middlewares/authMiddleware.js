// verify the jwt token and if user is admin or not

const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authMiddlware = asyncHandler(async (req, res, next) => {
    let token;
    if (req?.headers?.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];

        try {
            if (token) {
                const decoded = jwt.verify(token, "mySecret");
                const user = await User.findById(decoded?.id);
                req.user = user;
                console.log("req.user", req.user.refreshToken);

                next();
            }
        } catch (error) {
            throw new Error("Not authorized Token expirred,Please login again");
        }
    } else {
        throw new Error("There is no Bearer Token Present");
    }
});

const isAdmin = asyncHandler(async (req, res, next) => {
    const { email } = req.user;
    const adminUser = await User.findOne({ email });
    if (adminUser.isRole != "admin") {
        throw new Error("You are not an Admin");
    } else {
        next();
    }
});
module.exports = { authMiddlware, isAdmin };
