const mongoose = require('mongoose');
const Apartment = require('./models/Apartment'); // Assicurati che il percorso sia corretto

// Connettiti a MongoDB
mongoose.connect('mongodb://localhost:27017/keycloud', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connesso a MongoDB");
    aggiungiCampiMancanti();
  })
  .catch(err => console.error("Errore di connessione a MongoDB:", err));

// Funzione per aggiungere campi mancanti 'data_inizio' e 'data_fine'
async function aggiungiCampiMancanti() {
  try {
    // Trova tutti gli appartamenti che non hanno 'data_inizio' o 'data_fine'
    const apartments = await Apartment.find({
      $or: [{ data_inizio: { $exists: false } }, { data_fine: { $exists: false } }]
    });

    const updatePromises = apartments.map(apartment => {
      // Aggiungi i campi 'data_inizio' e 'data_fine' se mancano e imposta valori di default (puoi modificarli come preferisci)
      apartment.data_inizio = apartment.data_inizio; // Imposta la data di oggi come esempio
      apartment.data_fine = apartment.data_fine; // Imposta la data di oggi come esempio
      apartment.status = apartment.status || "Inactive"; // Imposta lo stato predefinito come "Inattivo"
      return apartment.save(); // Salva l'appartamento aggiornato
    });

    await Promise.all(updatePromises); // Attendi che tutti gli aggiornamenti siano completati

    console.log("Campi mancanti aggiunti con successo!");
    process.exit(0); // Esci dallo script
  } catch (error) {
    console.error("Errore durante l'aggiunta dei campi mancanti:", error.message);
    process.exit(1); // Esci con codice di errore
  }
}
