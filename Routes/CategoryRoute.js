import express from "express";

import { addCategory, getCategory } from "../Controllers/CategoryController.js";
import { userVerification } from "../Middlewares/AuthMiddleware.js";

const router = express.Router();

router.get("/", userVerification, getCategory);

router.post("/", addCategory);

export default router;
