// src/components/pricing/PricingPlans.js
import React from "react"; // Importo React per creare componenti
import { Container, Grid, Card, CardContent, Typography } from "@mui/material"; // Importo i componenti Material-UI necessari
import { useTheme } from "@mui/material/styles"; // Importo useTheme per accedere al tema corrente
import CustomButton from "../customComponents/CustomButton"; // Importo CustomButton per pulsanti personalizzati
import { pxToRem } from "../../utils/pxToRem"; // Importo la funzione pxToRem per convertire px in rem
import { useTranslation } from "react-i18next"; // Importo il hook useTranslation per la gestione delle traduzioni

const PricingPlans = () => {
  const theme = useTheme(); // Uso il tema corrente per applicare gli stili
  const { t } = useTranslation(); // Uso il hook useTranslation per ottenere la funzione di traduzione

  // Definisco i piani tariffari da mostrare
  const plans = [
    {
      title: t("basic_plan"), // Uso la funzione t per ottenere la traduzione del titolo del piano "Basic"
      description: t("basic_plan_description"), // Uso la funzione t per ottenere la traduzione della descrizione del piano
      price: `$99/${t("month")}`, // Prezzo del piano con traduzione per la parola "month"
    },
    {
      title: t("medium_plan"), // Uso la funzione t per ottenere la traduzione del titolo del piano "Medium"
      description: t("medium_plan_description"), // Uso la funzione t per ottenere la traduzione della descrizione del piano
      price: `$199/${t("month")}`, // Prezzo del piano con traduzione per la parola "month"
    },
    {
      title: t("premium_plan"), // Uso la funzione t per ottenere la traduzione del titolo del piano "Premium"
      description: t("premium_plan_description"), // Uso la funzione t per ottenere la traduzione della descrizione del piano
      price: `$399/${t("month")}`, // Prezzo del piano con traduzione per la parola "month"
    },
  ];

  return (
    // Contenitore principale per il layout dei piani tariffari
    <Container>
      {/* Titolo principale della sezione dei piani tariffari */}
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ color: theme.palette.text.primary }} // Colore del testo primario dal tema
      >
        {t("our_pricing_plans")}{" "}
        {/* Usa la funzione t per ottenere la traduzione del testo "Our Pricing Plans" */}
      </Typography>

      {/* Griglia per visualizzare i piani tariffari */}
      <Grid container spacing={4}>
        {/* Mappo ogni piano tariffario per creare una Card */}
        {plans.map((plan) => (
          <Grid item xs={12} sm={6} md={4} key={plan.title}>
            {/* Card per ogni piano tariffario */}
            <Card
              sx={{
                backgroundColor: theme.palette.background.default, // Colore di sfondo più chiaro dal tema
                boxShadow: `0px ${pxToRem(0)} ${pxToRem(8)} ${
                  theme.colors.secondary
                }`, // Ombra per il box
                borderRadius: pxToRem(8), // Usa pxToRem per i bordi arrotondati
                transition: "transform 0.3s ease", // Effetto hover per un'animazione di scalatura
                "&:hover": {
                  transform: "scale(1.05)", // Ingrandisce leggermente la card al passaggio del mouse
                },
              }}>
              <CardContent>
                {/* Titolo del piano */}
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    color: theme.palette.primary.main, // Colore principale del tema
                    marginBottom: pxToRem(16), // Usa pxToRem per il margine inferiore
                    fontWeight: "bold", // Testo in grassetto per evidenziare il titolo
                  }}>
                  {plan.title} {/* Titolo del piano tradotto */}
                </Typography>

                {/* Descrizione del piano */}
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.primary, // Colore del testo dal tema
                    marginBottom: pxToRem(8), // Usa pxToRem per il margine inferiore
                  }}>
                  {plan.description} {/* Descrizione del piano tradotta */}
                </Typography>

                {/* Prezzo del piano */}
                <Typography
                  variant="h6"
                  sx={{
                    color: theme.palette.secondary.main, // Usa il colore secondario per maggiore contrasto
                    marginTop: pxToRem(12), // Usa pxToRem per il margine superiore
                  }}>
                  {plan.price}{" "}
                  {/* Prezzo del piano con traduzione per "month" */}
                </Typography>

                {/* Pulsante per scegliere il piano */}
                <CustomButton
                  variant="contained" // Pulsante con sfondo pieno
                  fullWidth // Pulsante a larghezza piena
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
                  {t("choose_plan")}{" "}
                  {/* Usa la funzione t per ottenere la traduzione del testo "Choose Plan" */}
                </CustomButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PricingPlans; // Esporto il componente per l'uso in altre parti dell'app
