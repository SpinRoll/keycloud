// src/components/Dashboard.js
import React from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import { pxToRem } from "../utils/pxToRem";
import { useTheme } from "@mui/material/styles"; // Importa useTheme per accedere al tema

const Dashboard = ({ onViewApartmentsClick }) => {
  const theme = useTheme(); // Usa il tema corrente

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
        <Button
          variant="contained"
          onClick={onViewApartmentsClick}
          sx={{
            backgroundColor: theme.palette.primary.main, // Usa il colore primario dal tema
            color: theme.colors.pureWhite, // Usa il colore dal tema
            marginBottom: pxToRem(16),
            "&:hover": { backgroundColor: theme.palette.secondary.main }, // Usa il colore secondario dal tema per l'hover
          }}>
          Appartamenti
        </Button>
      </Box>
    </Container>
  );
};

export default Dashboard;
