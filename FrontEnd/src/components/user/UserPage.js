// src/components/user/UserPage.js
import React, { useState } from "react";
import { Box, Container, List, ListItem, ListItemText } from "@mui/material";
import { pxToRem } from "../../utils/pxToRem";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import ProfileSection from "./ProfileSection"; // Importa i componenti delle sezioni
import BillingSection from "./BillingSection";
import PasswordSection from "./PasswordSection";

const UserPage = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [selectedSection, setSelectedSection] = useState("profile"); // Stato per la sezione selezionata

  // Funzione per gestire il cambio della sezione
  const handleSectionChange = (section) => {
    setSelectedSection(section);
  };

  // Determina quale componente visualizzare in base alla sezione selezionata
  const renderSection = () => {
    switch (selectedSection) {
      case "profile":
        return <ProfileSection />;
      case "billing":
        return <BillingSection />;
      case "password":
        return <PasswordSection />;
      default:
        return <ProfileSection />;
    }
  };

  return (
    <Container component="main" maxWidth="100%" sx={{ mt: pxToRem(100) }}>
      <Box sx={{ display: "flex", gap: pxToRem(24), flexWrap: "wrap" }}>
        {/* Sidebar per la navigazione */}
        <Box
          sx={{
            width: { xs: "100%", md: pxToRem(200) },
            backgroundColor: theme.palette.background.paper,
            borderRadius: pxToRem(8),
            boxShadow: `0px ${pxToRem(0)} ${pxToRem(10)} #635FC7`,
            padding: pxToRem(0),
          }}>
          <List component="nav">
            {["profile", "billing", "password"].map((section) => (
              <ListItem
                key={section}
                sx={{
                  cursor: "pointer",
                  padding: pxToRem(16),
                  backgroundColor:
                    selectedSection === section
                      ? theme.colors.secondary
                      : "inherit",
                  color:
                    selectedSection === section
                      ? theme.palette.background.default
                      : theme.palette.text.primary,
                  transition: "all 0.4s ease",
                  boxShadow:
                    selectedSection === section
                      ? `0 0 20px ${theme.colors.secondary}`
                      : "none",
                  "&:hover": {
                    backgroundColor:
                      selectedSection === section
                        ? theme.colors.secondary
                        : "transparent", // Rimuove il grigio e rende l'hover trasparente
                    transform:
                      selectedSection === section ? "none" : "scale(1.05)",
                    // boxShadow:
                    //   selectedSection === section
                    //     ? `0 0 20px ${theme.colors.secondary}`
                    //     : `0 0 10px ${theme.colors.secondary}`, // Aggiunge un'ombra più leggera
                  },
                }}
                onClick={() => handleSectionChange(section)}>
                <ListItemText primary={t(section)} />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Sezione principale che cambia dinamicamente in base alla voce selezionata */}
        <Box
          sx={{
            flexGrow: 1,
            backgroundColor: theme.palette.background.paper,
            borderRadius: pxToRem(8),
            boxShadow: `0px ${pxToRem(0)} ${pxToRem(10)} #635FC7`,
            padding: pxToRem(32),
            transition: "all 0.4s ease",
          }}>
          {renderSection()}
        </Box>
      </Box>
    </Container>
  );
};

export default UserPage;
