import express from "express";
import dotenv from "dotenv";

dotenv.config({ path: `src/.env` });

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
