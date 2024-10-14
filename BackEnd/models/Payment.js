// models/Payment.js
const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  abbonamento_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subscription",
    required: true,
  },
  data_pagamento: { type: Date, required: true },
  importo: { type: Number, required: true },
  metodo_pagamento: { type: String, default: "Stripe" },
  stato_pagamento: {
    type: String,
    enum: ["pending", "completed", "failed", "refunded"],
    default: "pending", // Stato iniziale
  },
  payment_intent_id: {
    type: String, // Questo campo è utile per collegare il pagamento a Stripe
    required: true,
  },
  currency: { type: String, default: "USD" }, // Puoi cambiare la valuta se necessario
});

module.exports = mongoose.model("Payment", paymentSchema);
