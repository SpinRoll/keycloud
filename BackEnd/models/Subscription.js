// models/Subscription.js
const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  tipo: { type: String, required: true }, // es. "Basic", "Premium"
  prezzo: { type: Number, required: true },
  max_appartamenti: { type: Number },
  stripe_price_id: {
    type: String, // Colleghiamo questo al Price ID di Stripe
    required: true,
  },
  stato_abbonamento: {
    type: String,
    enum: ["attivo", "scaduto", "cancellato"],
    default: "attivo",
  },
});

module.exports = mongoose.model("Subscription", subscriptionSchema);
