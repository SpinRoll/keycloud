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
      match: [/.+@.+\..+/, "Formato email non valido"], // Validazione per il formato email
    },
    email_temp: {
      type: String,
      unique: true,
      sparse: true, // Campo unico ma permette valori nulli o mancanti
      match: [/.+@.+\..+/, "Formato email non valido"], // Validazione per il formato email
    },
    password: { type: String, required: true },
    telefono: { type: String },
    registrazione_data: { type: Date, default: Date.now },
    abbonamento_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
    },
    abbonamento_inizio: { type: Date },
    refreshToken: { type: String },
    mfaEnabled: { type: Boolean, default: false }, // Se MFA è abilitato o meno
    mfaSecret: { type: String }, // Chiave segreta per l'autenticazione a due fattori
    mfaSecret_temp: { type: String }, // Chiave temporanea per la verifica dell'MFA
  },
  {
    timestamps: true, // Aggiunge automaticamente campi createdAt e updatedAt
  }
);

module.exports = mongoose.model("User", userSchema);
