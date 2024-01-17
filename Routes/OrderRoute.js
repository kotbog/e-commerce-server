import express from "express";
import {checkoutOrder, getOrders} from "../Controllers/OrderController.js";

const router = express.Router();

router.get('/', getOrders);

router.post('/', checkoutOrder)

export default router;