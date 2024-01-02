import express from "express";
import { addCartItem, getCartItems } from "../Controllers/CartController.js";

const router = express.Router();

router.get("/items", getCartItems);

router.post("/items", addCartItem);

export default router;
