import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: `src/.env` });

const app = express();
const port = process.env.PORT;
const mongoDBURI = process.env.MONGO_URI;

app.use(express.json());

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
