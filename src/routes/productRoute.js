import express from "express";

import {
    addProduct,
    getProducts,
    getSingleProduct,
    editProduct,
    removeProduct
} from "../controllers/productController.js";
import { adminMiddleware, authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();




router.get("/", getProducts);
router.get("/:id", getSingleProduct);

router.post("/", authMiddleware, adminMiddleware, addProduct);
router.put("/:id", authMiddleware, adminMiddleware, editProduct);
router.delete("/:id", authMiddleware, adminMiddleware, removeProduct);

export default router;