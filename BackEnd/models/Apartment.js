// models/Apartment.js
const mongoose = require("mongoose");

const apartmentSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    abbonamento_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription", // Facoltativo, ma utile se vuoi collegare ogni appartamento al piano dell'utente
    },
    nome: { type: String, required: true },
    via: { type: String, required: true },
    numero: { type: Number, required: true },
    piano_scala: { type: String },
    citta: { type: String, required: true },
    cap: { type: Number, required: true },
    prefisso: { type: Number, required: true },
    telefono: { type: Number, required: true },
    link: { type: String },
    fixed_link: { type: Boolean, default: false },
    data_inizio: { type: Date },
    data_fine: { type: Date },
    status: { type: String, default: "inactive" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Apartment", apartmentSchema);
