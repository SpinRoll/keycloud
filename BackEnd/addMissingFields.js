require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User"); // Assicurati che il percorso sia corretto

// Connessione a MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => console.log("Connesso a MongoDB"))
  .catch((err) => console.error("Errore di connessione a MongoDB:", err));

// Funzione per aggiungere i campi mancanti agli utenti
const addMissingFields = async () => {
  try {
    // Trova tutti gli utenti che non hanno il campo mfaSecret_temp
    const usersWithoutFields = await User.find({
      $or: [
        { mfaSecret_temp: { $exists: false } }, // Campo mfaSecret_temp mancante
      ],
    });

    // Aggiungi i campi mancanti
    const updatePromises = usersWithoutFields.map(async (user) => {
      try {
        return User.updateOne(
          { _id: user._id },
          {
            $set: {
              mfaSecret_temp: user.mfaSecret_temp || null, // Aggiungi mfaSecret_temp se mancante
            },
          }
        );
      } catch (error) {
        console.error(
          `Errore durante l'aggiornamento dell'utente ${user._id}:`,
          error
        );
      }
    });

    // Attendi l'aggiornamento di tutti i documenti
    await Promise.all(updatePromises);

    console.log("Campi mancanti aggiunti correttamente agli utenti.");
    process.exit();
  } catch (error) {
    console.error("Errore durante l'aggiornamento dei campi mancanti:", error);
    process.exit(1);
  }
};

// Avvia lo script
addMissingFields();
// Questo script si connette al database MongoDB e aggiunge i campi mancanti agli utenti.
