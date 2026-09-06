import express from 'express';
import { 
    createOrder, 
    getAllOrders, 
    getMyOrders, 
    getOrderById, 
    updateOrderStatus 
} from '../controllers/order.controller.js';

import {protectRoute} from '../middleware/protectRoute.js'
import {adminOnly} from '../middleware/adminRoute.js';


const router = express.Router();

router.get("/admin", protectRoute, adminOnly, getAllOrders);
router.post("/create-order", protectRoute,createOrder);
router.get("/my-orders",protectRoute, getMyOrders);
router.get("/:id",protectRoute, getOrderById);
router.put("/:id/status",protectRoute, adminOnly, updateOrderStatus);





export default router;