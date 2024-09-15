// models/SubscriptionRegistration.js
const mongoose = require("mongoose");

const subscriptionRegistrationSchema = new mongoose.Schema({
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
  numero_appartamenti: { type: Number },
  registrazione_data: { type: Date, default: Date.now },
});

module.exports = mongoose.model(
  "SubscriptionRegistration",
  subscriptionRegistrationSchema
);
