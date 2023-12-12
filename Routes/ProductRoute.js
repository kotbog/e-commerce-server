import express from "express";
import {
    addProduct,
    getProductByID,
    getProducts,
    removeProduct,
    updateProduct
} from "../Controllers/ProductsController.js";

const router = express.Router();

router.get('/:id', getProductByID);

router.put('/:id',updateProduct)

router.get('/', getProducts);

router.post('/', addProduct);

router.delete('/:id', removeProduct);

export default router;