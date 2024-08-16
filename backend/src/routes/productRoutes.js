import express from "express";
import {
  createProduct,
  getAllProducts,
} from "../controllers/productController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getAllProducts);
router.post("/", authMiddleware, createProduct);

export default router;
