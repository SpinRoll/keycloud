// src/components/pricing/PricingPlans.js
import React from "react";
import { Container, Grid, Card, CardContent, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles"; // Importa useTheme per accedere al tema
import CustomButton from "../customComponents/CustomButton"; // Importa CustomButton
import { pxToRem } from "../../utils/pxToRem"; // Importa la funzione pxToRem

const PricingPlans = () => {
  const theme = useTheme(); // Usa il tema corrente

  const plans = [
    {
      title: "Basic",
      description: "Ideal for managing up to 4 apartments",
      price: "$99/month",
    },
    {
      title: "Medium",
      description: "Ideal for managing up to 8 apartments",
      price: "$199/month",
    },
    {
      title: "Premium",
      description: "Ideal for managing up to 20 apartments",
      price: "$399/month",
    },
  ];

  return (
    <Container>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ color: theme.palette.text.primary }} // Colore del testo primario
      >
        Our Pricing Plans
      </Typography>
      <Grid container spacing={4}>
        {plans.map((plan) => (
          <Grid item xs={12} sm={6} md={4} key={plan.title}>
            <Card
              sx={{
                backgroundColor: theme.palette.background.default, // Sfondi più chiari rispetto allo sfondo principale
                boxShadow: `0px ${pxToRem(0)} ${pxToRem(8)} ${
                  theme.colors.secondary
                }`,
                borderRadius: pxToRem(8), // Usa pxToRem per i bordi arrotondati
                transition: "transform 0.3s ease", // Effetto hover su Card
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
                    marginBottom: pxToRem(16), // Usa pxToRem per il margine inferiore
                    fontWeight: "bold", // Testo più evidente
                  }}>
                  {plan.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.primary,
                    marginBottom: pxToRem(8), // Usa pxToRem per il margine inferiore
                  }}>
                  {plan.description}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: theme.palette.secondary.main, // Usa il colore secondario per maggiore contrasto
                    marginTop: pxToRem(12), // Usa pxToRem per il margine superiore
                  }}>
                  {plan.price}
                </Typography>
                <CustomButton
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: theme.palette.primary.main, // Colore primario più forte
                    color: theme.colors.pureWhite, // Colore bianco puro per contrasto
                    marginTop: pxToRem(16), // Usa pxToRem per il margine superiore
                    "&:hover": {
                      backgroundColor: theme.palette.primary.dark, // Un colore leggermente più scuro per hover
                    },
                    padding: `${pxToRem(10)} ${pxToRem(20)}`, // Usa pxToRem per il padding
                    fontSize: pxToRem(16), // Usa pxToRem per la dimensione del font
                  }}>
                  Choose Plan
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
