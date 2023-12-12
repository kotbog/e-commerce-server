import express from "express";
import {getCartItems} from "../Controllers/ShoppingSessionController.js";

const router = express.Router();

router.get('/items', getCartItems)

export default router;