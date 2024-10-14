// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    cognome: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Formato email non valido"],
    },
    email_temp: {
      type: String,
      unique: true,
      sparse: true,
      match: [/.+@.+\..+/, "Formato email non valido"],
    },
    password: { type: String, required: true },
    telefono: { type: String },
    registrazione_data: { type: Date, default: Date.now },
    abbonamento_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
    },
    abbonamento_inizio: { type: Date },
    abbonamento_fine: { type: Date },
    abbonamento_stato: {
      type: String,
      enum: ["attivo", "scaduto", "cancellato"],
      default: "attivo", // Stato dell'abbonamento sincronizzato con Stripe
    },
    stripe_customer_id: {
      type: String, // Salviamo l'ID del cliente di Stripe per ogni utente
    },
    refreshToken: { type: String },
    mfaEnabled: { type: Boolean, default: false },
    mfaSecret: { type: String },
    mfaSecret_temp: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
