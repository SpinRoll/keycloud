// stripe.js
require("dotenv").config(); // Ensure environment variables are loaded
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = stripe;
