// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Controlla l'ambiente e usa l'URI corretto
const mongoURI =
  process.env.NODE_ENV === "production"
    ? process.env.MONGODB_URI_PROD
    : process.env.MONGODB_URI_DEV;

// Connessione a MongoDB
mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connesso"))
  .catch((err) =>
    console.error("Errore di connessione a MongoDB:", err.message)
  );

// Rotte di esempio
app.get("/", (req, res) => {
  res.send("Benvenuto nel backend!");
});

// Importa le rotte di autenticazione
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes); // Usa le rotte di autenticazione

// Aggiungi la rotta per il profilo utente
app.use("/api/user", authRoutes); // Gestisce le rotte relative all'utente

// Rotte degli appartamenti
const apartmentRoutes = require("./routes/apartments");
app.use("/api/apartments", apartmentRoutes); // Usa le rotte degli appartamenti

// Avvia il server
app.listen(PORT, () => {
  console.log(`Server in ascolto sulla porta ${PORT}`);
});
