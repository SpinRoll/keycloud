// routes/apartments.js
const express = require("express");
const Apartment = require("../models/Apartment");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Endpoint per ottenere gli appartamenti dell'utente autenticato
router.get("/", authMiddleware, async (req, res) => {
  try {
    console.log(
      "Richiesta per ottenere gli appartamenti per l'utente ID:",
      req.userId
    ); // Aggiungi questo log
    const userId = req.userId;

    // Trova gli appartamenti associati all'utente
    const apartments = await Apartment.find({ user_id: userId });

    res.status(200).json(apartments);
  } catch (error) {
    console.error(
      "Errore durante il recupero degli appartamenti:",
      error.message
    );
    res.status(500).json({ message: "Errore nel recupero degli appartamenti" });
  }
});

module.exports = router;
