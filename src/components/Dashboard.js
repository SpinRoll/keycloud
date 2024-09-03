// src/components/Dashboard.js
import React from "react";
import { Container, Box, Typography } from "@mui/material";
import { pxToRem } from "../utils/pxToRem";
import { useTheme } from "@mui/material/styles"; // Importa useTheme per accedere al tema
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import CustomButton from "./customComponents/CustomButton"; // Importa CustomButton

const Dashboard = () => {
  const theme = useTheme(); // Usa il tema corrente
  const navigate = useNavigate(); // Usa useNavigate per la navigazione

  // Funzione per navigare alla pagina degli appartamenti
  const handleViewApartmentsClick = () => {
    navigate("/apartments");
  };

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: pxToRem(20),
          borderRadius: pxToRem(8),
          backgroundColor: theme.palette.background.paper, // Usa il colore dal tema
          boxShadow: `0px ${pxToRem(4)} ${pxToRem(10)} rgba(0, 0, 0, 0.3)`,
        }}>
        <Typography
          component="h1"
          variant="h4"
          sx={{
            marginBottom: pxToRem(24),
            color: theme.palette.text.primary, // Usa il colore dal tema
          }}>
          Dashboard
        </Typography>
        <CustomButton
          variant="contained"
          onClick={handleViewApartmentsClick} // Usa la funzione per navigare
          sx={{
            backgroundColor: theme.palette.primary.main, // Usa il colore primario dal tema
            color: theme.colors.pureWhite, // Usa il colore dal tema
            marginBottom: pxToRem(16),
            "&:hover": { backgroundColor: theme.palette.secondary.main }, // Usa il colore secondario dal tema per l'hover
          }}>
          Appartamenti
        </CustomButton>
      </Box>
    </Container>
  );
};

export default Dashboard;
