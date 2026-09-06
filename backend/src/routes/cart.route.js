import express from 'express';
import { addToCart, clearCart, decreaseCartItem, getCart, removeProductFromCart } from '../controllers/cart.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();

router.get("/", protectRoute, getCart);

router.post("/add/:productId", protectRoute, addToCart);
router.delete("/remove/:productId", protectRoute, removeProductFromCart);
router.patch("/decrease/:productId", protectRoute, decreaseCartItem);

router.delete("/clear", protectRoute, clearCart);

export default router;