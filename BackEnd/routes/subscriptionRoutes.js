// routes/subscriptionRoutes.js
const express = require("express");
const router = express.Router();
const Subscription = require("../models/Subscription");

router.get("/", async (req, res) => {
  try {
    const subscriptions = await Subscription.find({});
    res.json(subscriptions);
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching subscriptions" });
  }
});

module.exports = router;
