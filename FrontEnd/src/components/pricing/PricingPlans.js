// src/components/pricing/PricingPlans.js
import React from "react";
import axios from "axios";
import { Container, Grid, Card, CardContent, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CustomButton from "../customComponents/CustomButton";
import { pxToRem } from "../../utils/pxToRem";
import { useTranslation } from "react-i18next";
import { useStripe } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";

const PricingPlans = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  const stripe = useStripe();
  const navigate = useNavigate();

  // Hardcoded plans array with Stripe price IDs
  const plans = [
    {
      id: "basic",
      title: t("basic_plan"),
      description: t("basic_plan_description"),
      price: `$99/${t("month")}`,
      priceId: "price_1Q9wdYChJhAOPXlZTdKBvfow", // Replace with your actual Stripe price ID
    },
    {
      id: "medium",
      title: t("medium_plan"),
      description: t("medium_plan_description"),
      price: `$199/${t("month")}`,
      priceId: "price_1QDXgXChJhAOPXlZzbqlLSyb", // Replace with your actual Stripe price ID
    },
    {
      id: "premium",
      title: t("premium_plan"),
      description: t("premium_plan_description"),
      price: `$399/${t("month")}`,
      priceId: "price_1QDXgnChJhAOPXlZD1uHw5vd", // Replace with your actual Stripe price ID
    },
  ];

  const handleChoosePlan = async (priceId) => {
    try {
      const response = await axios.post(
        "/api/payments/create-checkout-session",
        {
          priceId, // Send the priceId to the backend
        }
      );

      const { sessionId } = response.data;

      // Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        console.error("Stripe redirect error:", error);
        // Handle error accordingly
      }
    } catch (error) {
      console.error("Error initiating checkout:", error);
      // Handle error accordingly
    }
  };

  return (
    <Container>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ color: theme.palette.text.primary }}>
        {t("our_pricing_plans")}
      </Typography>

      <Grid container spacing={4}>
        {plans.map((plan) => (
          <Grid item xs={12} sm={6} md={4} key={plan.id}>
            <Card
              sx={{
                backgroundColor: theme.palette.background.default,
                boxShadow: `0px ${pxToRem(0)} ${pxToRem(8)} ${
                  theme.colors.secondary
                }`,
                borderRadius: pxToRem(8),
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}>
              <CardContent>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    color: theme.palette.primary.main,
                    marginBottom: pxToRem(16),
                    fontWeight: "bold",
                  }}>
                  {plan.title}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.primary,
                    marginBottom: pxToRem(8),
                  }}>
                  {plan.description}
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    color: theme.palette.secondary.main,
                    marginTop: pxToRem(12),
                  }}>
                  {plan.price}
                </Typography>

                <CustomButton
                  variant="contained"
                  fullWidth
                  onClick={() => handleChoosePlan(plan.priceId)}
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    color: theme.colors.pureWhite,
                    marginTop: pxToRem(16),
                    "&:hover": {
                      backgroundColor: theme.palette.primary.dark,
                    },
                    padding: `${pxToRem(10)} ${pxToRem(20)}`,
                    fontSize: pxToRem(16),
                  }}>
                  {t("choose_plan")}
                </CustomButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PricingPlans;
