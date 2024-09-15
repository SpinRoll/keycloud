const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    cognome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    telefono: { type: String },
    registrazione_data: { type: Date, default: Date.now }, // Mongoose usa UTC di default
    abbonamento_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
    },
    abbonamento_inizio: { type: Date },
    refreshToken: { type: String },
  },
  {
    timestamps: true, // Aggiunge automaticamente campi createdAt e updatedAt in UTC
  }
);

module.exports = mongoose.model("User", userSchema);
