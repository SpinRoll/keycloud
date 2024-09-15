// models/Apartment.js
const mongoose = require("mongoose");

const apartmentSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  nome: { type: String },
  telefono: { type: String },
  link: { type: String },
  via: { type: String },
  data_inizio: { type: Date },
  data_fine: { type: Date },
});

module.exports = mongoose.model("Apartment", apartmentSchema);
