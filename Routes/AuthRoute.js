import express from "express";
import {LogIn, SignUp} from "../Controllers/AuthController.js";
import {userVerification} from "../Middlewares/AuthMiddleware.js";


const router = express.Router();

// @route POST /signup
// @description Signup
// @access Public
router.post('/signup', SignUp);

// @route POST /login
// @description Login with email and password
// @access Public
router.post('/login', LogIn);

// @route POST /
// @description verification with token
// @access Public
router.post('/', userVerification);

export default router;