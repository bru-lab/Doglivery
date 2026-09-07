import express from 'express';

import {
    createProduct,
    deleteProduct,
    getAvailableProducts,
    getProductById,
    getProducts,
    updateProduct
} from '../controllers/product.controller.js';

import { protectRoute } from '../middleware/protectRoute.js';
import { adminOnly } from '../middleware/adminRoute.js';

const router = express.Router();

// PUBLIC - CUSTOMER

router.get("/available", getAvailableProducts);


// ADMIN ONLY

router.get("/admin", protectRoute, adminOnly, getProducts);

router.post("/create", protectRoute, adminOnly, createProduct);

router.put("/update/:id", protectRoute, adminOnly, updateProduct);

router.delete("/delete/:id", protectRoute, adminOnly, deleteProduct);


// PUBLIC - SPECIFIC PRODUCT

router.get("/:id", getProductById);


export default router;