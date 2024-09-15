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
  metodo_pagamento: { type: String },
  stato_pagamento: { type: String },
});

module.exports = mongoose.model("Payment", paymentSchema);
