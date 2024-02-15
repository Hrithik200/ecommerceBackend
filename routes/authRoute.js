const express = require("express");
const {
    createUser,
    loginUserCtrl,
    getAllUser,
    getAUser,
    deleteAUser,
    updatedUser,
    blockUser,
    unblockUser,
    handleRefreshToken,
    logout,
    updatePassword,
    forgotPasswordToken,
    resetPassword,
} = require("../controller/userController");
const { authMiddlware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", createUser);
router.post("/forgot-password-token", forgotPasswordToken);


router.get("/login", loginUserCtrl);
router.get("/logout", logout);
router.get("/all-users", getAllUser);
router.get("/refresh", handleRefreshToken);

router.get("/:id", authMiddlware, isAdmin, getAUser);
 
router.put("/edit-user", authMiddlware, updatedUser);
router.put("/block-user/:id", authMiddlware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddlware, isAdmin, unblockUser);
router.put("/password", authMiddlware, updatePassword);
router.put("/reset-password/:token", resetPassword);

router.delete("/:id", deleteAUser);

module.exports = router;
