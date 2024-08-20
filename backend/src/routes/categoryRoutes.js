import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createCategory } from "../controllers/categoryController.js ";

const router = express.Router();

// Kreiranje kategorije
router.post("/", authMiddleware, createCategory);

export default router;
