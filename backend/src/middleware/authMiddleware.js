import jwt from "jsonwebtoken";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve("src/.env") });

const jwtSecret = process.env.JWT_SECRET;

export const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ message: "Access Denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token.", err });
  }
};
