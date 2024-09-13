// src/components/Dashboard.js
import React from "react"; // Importo React per creare componenti
import { Container, Box, Typography } from "@mui/material"; // Importo i componenti Material-UI necessari
import { pxToRem } from "../utils/pxToRem"; // Funzione di utilità per convertire px in rem
import { useTheme } from "@mui/material/styles"; // Importo useTheme per accedere al tema corrente
import { useNavigate } from "react-router-dom"; // Importo useNavigate per gestire la navigazione tra le pagine
import CustomButton from "./customComponents/CustomButton"; // Importo il componente CustomButton per i pulsanti personalizzati
import { useTranslation } from "react-i18next"; // Importo il hook useTranslation per la gestione delle traduzioni

const Dashboard = () => {
  // Creo un componente funzionale per la dashboard

  const theme = useTheme(); // Uso il tema corrente per applicare gli stili
  const navigate = useNavigate(); // Uso useNavigate per navigare tra le pagine dell'applicazione
  const { t } = useTranslation(); // Uso il hook useTranslation per ottenere la funzione di traduzione

  // Funzione per navigare alla pagina degli appartamenti
  const handleViewApartmentsClick = () => {
    navigate("/apartments"); // Uso navigate per reindirizzare alla pagina degli appartamenti
  };

  // Funzione per navigare alla pagina dei piani di pagamento
  const handleViewPricingPlansClick = () => {
    navigate("/pricing"); // Uso navigate per reindirizzare alla pagina dei piani di pagamento
  };

  return (
    // Contenitore principale per il layout della dashboard
    <Container component="main" maxWidth="md">
      {/* Box per contenere il contenuto centrale della dashboard */}
      <Box
        sx={{
          display: "flex", // Definisce il layout flessibile
          flexDirection: "column", // Disposizione degli elementi in colonna
          alignItems: "center", // Centra gli elementi all'interno del box
          padding: pxToRem(20), // Padding interno calcolato in rem
          borderRadius: pxToRem(8), // Bordi arrotondati del box
          backgroundColor: theme.palette.background.paper, // Usa il colore di sfondo dal tema
          boxShadow: `0px ${pxToRem(4)} ${pxToRem(10)} rgba(0, 0, 0, 0.3)`, // Applica un'ombra al box
          marginBottom: pxToRem(40), // Aggiunge spazio sotto la box per separare i componenti
        }}>
        {/* Titolo principale della dashboard */}
        <Typography
          component="h1" // Componente heading principale
          variant="h4" // Variante del testo di livello 4
          sx={{
            marginBottom: pxToRem(24), // Spazio sotto il titolo
            color: theme.palette.text.primary, // Usa il colore del testo dal tema
          }}>
          {t("dashboard")}{" "}
          {/* Uso la funzione t per ottenere la traduzione del testo "Dashboard" */}
        </Typography>

        {/* Pulsante per visualizzare gli appartamenti */}
        <CustomButton
          variant="contained" // Variante del pulsante per avere uno sfondo pieno
          onClick={handleViewApartmentsClick} // Usa la funzione per navigare alla pagina degli appartamenti
          sx={{
            backgroundColor: theme.palette.primary.main, // Usa il colore primario dal tema
            color: theme.colors.pureWhite, // Colore del testo impostato a bianco puro
            marginBottom: pxToRem(16), // Spazio sotto il pulsante
            "&:hover": { backgroundColor: theme.palette.secondary.main }, // Cambia colore al passaggio del mouse
          }}>
          {t("apartments")}{" "}
          {/* Uso la funzione t per ottenere la traduzione del testo "Appartamenti" */}
        </CustomButton>

        {/* Pulsante per visualizzare i piani di pagamento */}
        <CustomButton
          variant="contained" // Variante del pulsante per avere uno sfondo pieno
          onClick={handleViewPricingPlansClick} // Usa la funzione per navigare alla pagina dei piani di pagamento
          sx={{
            backgroundColor: theme.palette.primary.main, // Usa il colore primario dal tema
            color: theme.colors.pureWhite, // Colore del testo impostato a bianco puro
            marginBottom: pxToRem(16), // Spazio sotto il pulsante
            "&:hover": { backgroundColor: theme.palette.secondary.main }, // Cambia colore al passaggio del mouse
          }}>
          {t("pricing_plans")}{" "}
          {/* Uso la funzione t per ottenere la traduzione del testo "Piani di Pagamento" */}
        </CustomButton>
      </Box>
    </Container>
  );
};

export default Dashboard; // Esporto il componente Dashboard per l'uso in altre parti dell'app
