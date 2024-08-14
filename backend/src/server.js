import express from "express";
import dotenv from "dotenv";

// Učitaj .env fajl iz trenutnog direktorijuma
dotenv.config({ path: `src/.env` });

const app = express();
const port = process.env.PORT;

// // Middleware
app.use(express.json()); // Omogućava parsiranje JSON tela zahteva

// // Pokretanje servera
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
