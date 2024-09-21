require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User"); // Assicurati che il percorso sia corretto

// Connessione a MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connesso a MongoDB"))
  .catch((err) => console.error("Errore di connessione a MongoDB:", err));

// Funzione per aggiungere i campi mancanti agli utenti
const addMissingFields = async () => {
  try {
    // Trova tutti gli utenti che non hanno il campo email_temp, mfaEnabled o mfaSecret
    const usersWithoutFields = await User.find({
      $or: [
        { email_temp: { $exists: false } }, // Campo email_temp mancante
        { mfaEnabled: { $exists: false } }, // Campo mfaEnabled mancante
        { mfaSecret: { $exists: false } }, // Campo mfaSecret mancante
      ],
    });

    // Aggiungi i campi mancanti
    const updatePromises = usersWithoutFields.map(async (user) => {
      try {
        return User.updateOne(
          { _id: user._id },
          {
            $set: {
              email_temp: user.email_temp || null, // Aggiungi email_temp se mancante
              mfaEnabled: user.mfaEnabled || false, // Aggiungi mfaEnabled se mancante
              mfaSecret: user.mfaSecret || null, // Aggiungi mfaSecret se mancante
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
