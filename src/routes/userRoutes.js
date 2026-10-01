import express from 'express';

import { loginUser, registerUser, getAllUsers, getSingleUser, updateUserController, deleteUserController } from '../controllers/userController.js';

import { adminMiddleware, authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();


router.post("/register", registerUser);
router.post("/login", loginUser);



// for admin accesss
router.get("/", authMiddleware, adminMiddleware, getAllUsers);
router.get("/:id", authMiddleware, getSingleUser);
router.put("/:id", authMiddleware, updateUserController);
router.delete("/:id", authMiddleware, deleteUserController);


export default router; 