import express from 'express';
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from '../controllers/product.controller.js';
import {protectRoute} from '../middleware/protectRoute.js';
import { adminOnly } from '../middleware/adminRoute.js';


const router = express.Router();

// Public
router.get("/", getProducts);
router.get("/:id", getProductById);

// ADMIN ONLY
router.post("/create", protectRoute, adminOnly, createProduct);
router.put("/update/:id", protectRoute, adminOnly, updateProduct);
router.delete("/delete/:id", protectRoute, adminOnly, deleteProduct);


export default router;