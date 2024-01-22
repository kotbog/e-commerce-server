import express from "express";
import {
    checkoutOrder,
    getOrderById,
    getOrderDetails,
    updateOrders,
    updateOrderStatus
} from "../Controllers/OrderController.js";

const router = express.Router();

router.get('/', getOrderDetails);

router.post('/', checkoutOrder);

router.get('/:orderId', getOrderById);

router.put('/status', updateOrderStatus)

export default router;