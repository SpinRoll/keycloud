const mongoose = require('mongoose');
const Apartment = require('./models/Apartment'); // Assicurati che il percorso del modello sia corretto

// Connettiti a MongoDB
mongoose.connect('mongodb://localhost:27017/keycloud', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connesso a MongoDB");
    verificaCampi();
  })
  .catch(err => console.error("Errore di connessione a MongoDB:", err));

// Funzione per verificare i campi 'data_inizio' e 'data_fine'
async function verificaCampi() {
  try {
    // Trova tutti gli appartamenti
    const apartments = await Apartment.find({});

    apartments.forEach(apartment => {
      console.log(`\nAppartamento ID: ${apartment._id}`);
      console.log(`Nome: ${apartment.nome}`);
      console.log(`Data Inizio: ${apartment.data_inizio ? apartment.data_inizio : 'Manca'}`);
      console.log(`Data Fine: ${apartment.data_fine ? apartment.data_fine : 'Manca'}`);
      console.log(`Stato: ${apartment.status ? apartment.status : 'Manca'}`);
    });

    process.exit(0); // Esce dallo script
  } catch (error) {
    console.error("Errore durante la verifica dei campi:", error.message);
    process.exit(1); // Esce con codice di errore
  }
}
