import express from "express";
import {
  getUser,
  loginUser,
  logoutUser,
  refreshToken,
} from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/refresh-token", refreshToken);
router.get("/user", authMiddleware, getUser);

export default router;
