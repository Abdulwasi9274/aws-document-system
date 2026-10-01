import express from "express";

import {
    addOrder,
    getOrders,
    getUserOrders,
    changeOrderStatus,
    removeOrder
} from "../controllers/orderController.js";

import { adminMiddleware, authMiddleware } from '../middleware/authMiddleware.js'
const router = express.Router();



router.post("/", authMiddleware, addOrder);

router.get("/", authMiddleware, adminMiddleware, getOrders);
router.get("/:userId", authMiddleware, getUserOrders);
router.put("/:id/status", authMiddleware, adminMiddleware, changeOrderStatus);
router.delete("/:id", authMiddleware, removeOrder);

export default router;