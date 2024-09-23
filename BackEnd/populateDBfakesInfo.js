// populateApartments.js
const mongoose = require("mongoose");
require("dotenv").config(); // Carica le variabili d'ambiente dal file .env

// Modello di Apartment
const Apartment = require("./models/Apartment");

// Connessione a MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connesso a MongoDB"))
  .catch((err) => console.error("Errore di connessione a MongoDB:", err));

// Dati finti per gli appartamenti
const apartmentsData = [
  {
    user_id: "66e74dc6e20db8731d6d4c5a", // Assicurati di avere un user_id valido nel database
    nome: "Appartamento Centro Storico",
    telefono: "123456789",
    link: "https://example.com/centro-storico",
    via: "Via Roma, 1, 00100 Roma",
    data_inizio: new Date("2024-01-01"),
    data_fine: new Date("2024-12-31"),
  },
  {
    user_id: "66e74dc6e20db8731d6d4c5a", // Assicurati di avere un user_id valido nel database
    nome: "Appartamento al Mare",
    telefono: "987654321",
    link: "https://example.com/al-mare",
    via: "Via del Mare, 10, 00100 Roma",
    data_inizio: new Date("2024-06-01"),
    data_fine: new Date("2024-09-30"),
  },
  {
    user_id: "66e74dc6e20db8731d6d4c5a", // Assicurati di avere un user_id valido nel database
    nome: "Appartamento in Montagna",
    telefono: "555444333",
    link: "https://example.com/in-montagna",
    via: "Via delle Alpi, 5, 00100 Roma",
    data_inizio: new Date("2024-02-15"),
    data_fine: new Date("2024-03-15"),
  },
];

// Funzione per inserire i dati finti
const populateApartments = async () => {
  try {
    await Apartment.insertMany(apartmentsData);
    console.log("Appartamenti inseriti con successo!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Errore durante l'inserimento degli appartamenti:", error);
    mongoose.connection.close();
  }
};

// Esegui la funzione per popolare il database
populateApartments();
