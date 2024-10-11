import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  createSupplier,
  deleteSupplier,
  getSupplier,
  getSuppliers,
  updateSupplier,
} from "../controllers/supplierController.js";

const router = express.Router();

router.get("/", authMiddleware, getSuppliers);
router.post("/", authMiddleware, createSupplier);
router.get("/:id", authMiddleware, getSupplier);

router.put("/:id", authMiddleware, updateSupplier);
router.delete("/:id", authMiddleware, deleteSupplier);

export default router;
