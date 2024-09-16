const express = require("express");
const Apartment = require("../models/Apartment");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Endpoint per creare un nuovo appartamento
router.post("/", authMiddleware, async (req, res) => {
  const { nome, via, numero, piano_scala, citta, cap, prefisso, telefono, link, data_inizio, data_fine } = req.body;

  try {
    const newApartment = new Apartment({
      user_id: req.userId, // Associa l'appartamento all'utente autenticato
      nome,
      via,
      numero,
      piano_scala,
      citta,
      cap,
      prefisso,
      telefono,
      link,
      data_inizio,
      data_fine,
    });

    await newApartment.save();
    res.status(201).json(newApartment);
  } catch (error) {
    console.error("Errore durante la creazione dell'appartamento:", error.message);
    res.status(500).json({ message: "Errore durante la creazione dell'appartamento" });
  }
});

// Endpoint per ottenere gli appartamenti dell'utente autenticato
router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId; // Recupera l'ID dell'utente autenticato dal middleware
    const apartments = await Apartment.find({ user_id: userId });

    res.status(200).json(apartments);
  } catch (error) {
    console.error("Errore durante il recupero degli appartamenti:", error.message);
    res.status(500).json({ message: "Errore nel recupero degli appartamenti" });
  }
});

// Endpoint per aggiornare un appartamento esistente
router.put("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { data_inizio, data_fine } = req.body;

  try {
    const updatedApartment = await Apartment.findByIdAndUpdate(
      id,
      { data_inizio, data_fine },
      { new: true, runValidators: true } // `new: true` restituisce il documento aggiornato
    );

    if (!updatedApartment) {
      return res.status(404).json({ message: "Appartamento non trovato" });
    }

    res.status(200).json(updatedApartment);
  } catch (error) {
    console.error("Errore durante l'aggiornamento dell'appartamento:", error.message);
    res.status(500).json({ message: "Errore durante l'aggiornamento dell'appartamento" });
  }
});


module.exports = router;
