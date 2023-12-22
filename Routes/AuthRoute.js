import express from "express";
import {
  LogIn,
  SignUp,
  refreshToken,
  removeToken,
} from "../Controllers/AuthController.js";

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

export default router;
