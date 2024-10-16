// routes/apartments.js
const express = require("express");
const Apartment = require("../models/Apartment");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Funzione per calcolare lo stato dell'appartamento
const calculateStatus = (data_inizio, data_fine) => {
  const today = new Date();
  if (data_inizio && data_fine) {
    if (new Date(data_fine) < today) {
      return "expired"; // Lo stato è 'expired' se la data di fine è passata
    } else if (new Date(data_inizio) <= today && new Date(data_fine) >= today) {
      return "active"; // Lo stato è 'active' se oggi è compreso tra le date di inizio e fine
    } else {
      return "inactive"; // Lo stato è 'inactive' se le date sono nel futuro
    }
  }
  return "inactive"; // Lo stato di default è 'inactive'
};

// Endpoint per creare un nuovo appartamento
router.post("/", authMiddleware, async (req, res) => {
  const {
    nome,
    via,
    numero,
    piano_scala,
    citta,
    cap,
    prefisso,
    telefono,
    link,
    fixed_link,
    data_inizio,
    data_fine,
    status,
  } = req.body;

  try {
    // Calcola lo stato di default
    const status = calculateStatus(data_inizio, data_fine);

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
      fixed_link,
      data_inizio,
      data_fine,
      status, // Imposta lo stato calcolato
    });

    await newApartment.save();
    res.status(201).json(newApartment);
  } catch (error) {
    console.error(
      "Errore durante la creazione dell'appartamento:",
      error.message
    );
    res
      .status(500)
      .json({ message: "Errore durante la creazione dell'appartamento" });
  }
});

// Endpoint per aggiornare un appartamento esistente
router.put("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const {
    nome,
    via,
    numero,
    piano_scala,
    citta,
    cap,
    prefisso,
    telefono,
    data_inizio,
    data_fine,
    link,
    fixed_link,
    status,
  } = req.body;

  try {
    // Server-side validation
    if (link && link.trim() !== "") {
      if (!fixed_link && (!data_inizio || !data_fine)) {
        return res.status(400).json({
          message:
            "Start and end dates are required when fixed link is disabled and a link is generated.",
        });
      }

      if (fixed_link && (data_inizio || data_fine)) {
        return res.status(400).json({
          message:
            "Cannot provide dates when fixed link is enabled and a link is generated.",
        });
      }
    }

    // Calcola il nuovo stato dell'appartamento
    const status = calculateStatus(data_inizio, data_fine);

    const updatedApartment = await Apartment.findByIdAndUpdate(
      id,
      {
        nome,
        via,
        numero,
        piano_scala,
        citta,
        cap,
        prefisso,
        telefono,
        data_inizio,
        data_fine,
        link,
        fixed_link,
        status,
      }, // Aggiorna anche lo stato
      { new: true, runValidators: true } // `new: true` restituisce il documento aggiornato
    );

    if (!updatedApartment) {
      return res.status(404).json({ message: "Appartamento non trovato" });
    }

    res.status(200).json(updatedApartment);
  } catch (error) {
    console.error(
      "Errore durante l'aggiornamento dell'appartamento:",
      error.message
    );
    res
      .status(500)
      .json({ message: "Errore durante l'aggiornamento dell'appartamento" });
  }
});

// Endpoint per ottenere gli appartamenti dell'utente autenticato
router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId; // Recupera l'ID dell'utente autenticato dal middleware
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

// Endpoint to delete an apartment
router.delete("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    // Find the apartment by ID
    const apartment = await Apartment.findById(id);

    if (!apartment) {
      return res.status(404).json({ message: "Apartment not found" });
    }

    // Check if the authenticated user is the owner of the apartment
    if (apartment.user_id.toString() !== req.userId) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    // Delete the apartment
    await Apartment.findByIdAndDelete(id);

    res.status(200).json({ message: "Apartment deleted successfully" });
  } catch (error) {
    console.error("Error deleting apartment:", error.message);
    res.status(500).json({ message: "Error deleting apartment" });
  }
});

module.exports = router;
