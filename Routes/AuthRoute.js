import express from "express";
import {
    LogIn,
    SignUp,
    refreshToken,
    removeToken,
} from "../Controllers/AuthController.js";
import { userVerification } from "../Middlewares/AuthMiddleware.js";

const router = express.Router();

// @route POST /signup
// @description Signup
// @access Public
router.post("/signup", SignUp);

// @route POST /login
// @description Login with email and password
// @access Public
router.post("/login", LogIn);

router.post("/refresh", refreshToken);

router.delete("/refresh", removeToken);

router.get("/me", userVerification, (req, res) => {
    return res.json({
        error: false,
        message: "Authenticated successfully.",
        user: req.user,
    });
});

export default router;
