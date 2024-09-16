// models/Apartment.js
const mongoose = require("mongoose");

const apartmentSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    nome: { type: String, required: true }, // Nome dell'appartamento
    via: { type: String, required: true }, // Via (Strada)
    numero: { type: Number, required: true }, // Numero civico
    piano_scala: { type: String }, // Piano/Scala
    citta: { type: String, required: true }, // Città
    cap: { type: Number, required: true }, // CAP (Codice Postale)
    prefisso: { type: Number, required: true }, // Prefisso telefonico
    telefono: { type: Number, required: true }, // Telefono
    link: { type: String }, // Link
    data_inizio: { type: Date }, // Data di inizio
    data_fine: { type: Date }, // Data di fine
  },
  {
    timestamps: true, // Aggiunge automaticamente campi createdAt e updatedAt in UTC
  }
);

module.exports = mongoose.model("Apartment", apartmentSchema);
