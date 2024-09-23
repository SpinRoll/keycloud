// models/Subscription.js
const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  tipo: { type: String, required: true },
  prezzo: { type: Number, required: true },
  max_appartamenti: { type: Number },
});

module.exports = mongoose.model("Subscription", subscriptionSchema);
