import express from "express";
import {
  getUser,
  loginUser,
  refreshToken,
  logoutUser,
  checkAuthStatus,
} from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/refresh-token", refreshToken);
router.get("/user", authMiddleware, getUser);
router.get("/status", checkAuthStatus);

export default router;
