import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  createSupplier,
  deleteSupplier,
  getSuppliers,
  updateSupplier,
} from "../controllers/supplierController.js";

const router = express.Router();

router.get("/", authMiddleware, getSuppliers);
router.post("/", authMiddleware, createSupplier);
router.put("/:id", authMiddleware, updateSupplier);
router.delete("/:id", authMiddleware, deleteSupplier);

export default router;
