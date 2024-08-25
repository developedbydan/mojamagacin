import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import supplierRoutes from "./routes/supplierRoutes.js";

dotenv.config({ path: `src/.env` });

const app = express();
const port = process.env.PORT;
const mongoDBURI = process.env.MONGO_URI;
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/suppliers", supplierRoutes);

mongoose
  .connect(mongoDBURI)
  .then(() => {
    console.log("App connected to database");
    app.listen(port, () => {
      console.log(`App is listening to port: ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
