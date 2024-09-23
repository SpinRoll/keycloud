// src/components/Dashboard.js
import React, { useEffect } from "react";
import { Container, Box, Typography } from "@mui/material";
import { pxToRem } from "../utils/pxToRem";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom"; // Importa useNavigate per la navigazione
import CustomButton from "./customComponents/CustomButton";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Funzione per navigare alla pagina degli appartamenti
  const handleViewApartmentsClick = () => {
    navigate("/apartments");
  };

  // Funzione per navigare alla pagina dei piani di pagamento
  const handleViewPricingPlansClick = () => {
    navigate("/pricing");
  };

  // Controlla se l'utente è autenticato al montaggio del componente
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Reindirizza alla pagina di login se non autenticato
      navigate("/sign-in");
    }
  }, [navigate]);

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: pxToRem(20),
          borderRadius: pxToRem(8),
          backgroundColor: theme.palette.background.paper,
          boxShadow: `0px ${pxToRem(4)} ${pxToRem(10)} rgba(0, 0, 0, 0.3)`,
          marginBottom: pxToRem(40),
        }}>
        <Typography
          component="h1"
          variant="h4"
          sx={{
            marginBottom: pxToRem(24),
            color: theme.palette.text.primary,
          }}>
          {t("dashboard")}
        </Typography>

        <CustomButton
          variant="contained"
          onClick={handleViewApartmentsClick}
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.colors.pureWhite,
            marginBottom: pxToRem(16),
            "&:hover": { backgroundColor: theme.palette.secondary.main },
          }}>
          {t("apartments")}
        </CustomButton>

        <CustomButton
          variant="contained"
          onClick={handleViewPricingPlansClick}
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.colors.pureWhite,
            marginBottom: pxToRem(16),
            "&:hover": { backgroundColor: theme.palette.secondary.main },
          }}>
          {t("pricing_plans")}
        </CustomButton>
      </Box>
    </Container>
  );
};

export default Dashboard;
