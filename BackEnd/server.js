const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path"); // Importa il modulo path
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const corsOptions = {
  origin: [
    "http://localhost:3000", // Permetti il frontend in locale
    "https://keycloud-production.up.railway.app", // Permetti il frontend in produzione
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Aggiungi i metodi permessi
  credentials: true, // Se usi cookie o autenticazione con sessioni
};

app.use(cors(corsOptions));

// Controlla l'ambiente e usa l'URI corretto
const mongoURI =
  process.env.NODE_ENV === "production"
    ? process.env.MONGODB_URI_PROD
    : process.env.MONGODB_URI_DEV;

// Connessione a MongoDB
mongoose
  .connect(mongoURI)
  .then(() => console.log(`MongoDB connesso su ${mongoURI}`))
  .catch((err) =>
    console.error("Errore di connessione a MongoDB:", err.message)
  );

// **Usa express.json() per il parsing delle richieste JSON**
app.use(express.json()); // Questo sostituisce body-parser

// Importa le rotte di autenticazione
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes); // Usa le rotte di autenticazione

// Aggiungi la rotta per il profilo utente
app.use("/api/user", authRoutes); // Gestisce le rotte relative all'utente

// Rotte degli appartamenti
const apartmentRoutes = require("./routes/apartments");
app.use("/api/apartments", apartmentRoutes); // Usa le rotte degli appartamenti

// Serve il frontend
app.use(express.static(path.join(__dirname, "../FrontEnd/build"))); // Serve i file statici dal build di React

// Reindirizza automaticamente alla rotta /sign-in
app.get("/", (req, res) => {
  res.redirect("/sign-in");
});

// Serve qualsiasi altra rotta con l'app React
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../FrontEnd/build", "index.html")); // Qualsiasi altra rotta sarà gestita dal frontend
});

// Avvia il server
app.listen(PORT, () => {
  console.log(`Server in ascolto sulla porta ${PORT}`);
});
