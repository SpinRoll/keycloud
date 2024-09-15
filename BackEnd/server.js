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

// Connessione a MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
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

// Rotte degli appartamenti
const apartmentRoutes = require("./routes/apartments");
app.use("/api/apartments", apartmentRoutes); // Usa le rotte degli appartamenti

// Avvia il server
app.listen(PORT, () => {
  console.log(`Server in ascolto sulla porta ${PORT}`);
});
