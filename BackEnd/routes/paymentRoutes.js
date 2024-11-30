// routes/paymentRoutes.js
const express = require("express");
const router = express.Router();
const stripe = require("../stripe"); // Import the Stripe instance

router.post("/create-checkout-session", async (req, res) => {
  const { priceId } = req.body;
  const domainURL = "http://localhost:3000"; // Replace with your frontend domain

  try {
    // Create a Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${domainURL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domainURL}/cancel`,
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating checkout session" });
  }
});

// routes/paymentRoutes.js (add this route)
router.post("/verify-session", async (req, res) => {
  const { sessionId } = req.body;

  try {
    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Implement your logic to update the user's subscription status
    // For example, find the user by session.customer_email and update the database

    res.json({ message: "Subscription activated successfully." });
  } catch (error) {
    console.error("Error verifying session:", error);
    res
      .status(500)
      .json({ error: "An error occurred while verifying session." });
  }
});

module.exports = router;
