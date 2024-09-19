require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User"); // Assicurati che il percorso sia corretto

// Connessione a MongoDB
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connesso a MongoDB"))
  .catch((err) => console.error("Errore di connessione a MongoDB:", err));

// Funzione per aggiungere il campo email_temp agli utenti che non lo hanno
const addMissingFields = async () => {
  try {
    // Trova tutti gli utenti che non hanno il campo email_temp
    const usersWithoutEmailTemp = await User.find({ email_temp: { $exists: false } });

    // Aggiungi il campo email_temp con valore null e assicurati che non ci siano duplicati
    const updatePromises = usersWithoutEmailTemp.map(async (user) => {
      try {
        // Aggiungi il campo email_temp solo se non esiste
        return User.updateOne({ _id: user._id }, { $set: { email_temp: null } });
      } catch (error) {
        console.error(`Errore durante l'aggiornamento dell'utente ${user._id}:`, error);
      }
    });

    // Attendi l'aggiornamento di tutti i documenti
    await Promise.all(updatePromises);

    console.log("Campi email_temp aggiunti correttamente agli utenti mancanti.");
    process.exit();
  } catch (error) {
    console.error("Errore durante l'aggiornamento dei campi mancanti:", error);
    process.exit(1);
  }
};

// Avvia lo script
addMissingFields();
