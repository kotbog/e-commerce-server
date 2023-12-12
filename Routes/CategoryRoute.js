import express from "express";

import {addCategory, getCategory} from '../Controllers/CategoryController.js' 

const router = express.Router();

router.get('/', getCategory);

router.post('/', addCategory);


export default router;