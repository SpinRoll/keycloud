// src/components/header/UserProfileMenuItem.js
import React from "react";
import { MenuItem, IconButton, Typography } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles"; // Importa useTheme per accedere al tema
import { pxToRem } from "../../utils/pxToRem";
import { useTranslation } from "react-i18next"; // Importa il hook useTranslation
import { useNavigate } from "react-router-dom"; // Importa useNavigate per la navigazione

const UserProfileMenuItem = ({ onClose }) => {
  const theme = useTheme(); // Usa il tema corrente
  const { t } = useTranslation(); // Usa il hook useTranslation per ottenere la funzione di traduzione
  const navigate = useNavigate(); // Usa useNavigate per la navigazione

  // Funzione per gestire il click e navigare alla pagina del profilo utente
  const handleNavigateToProfile = () => {
    navigate("/user-page"); // Naviga alla pagina UserPage
    onClose(); // Chiude il menu
  };

  return (
    <MenuItem
      onClick={handleNavigateToProfile}
      sx={{ display: "flex", alignItems: "center", gap: pxToRem(10) }}>
      <IconButton>
        <AccountCircle
          sx={{
            color:
              theme.palette.mode === "dark"
                ? theme.colors.pureWhite
                : theme.colors.gray,
          }}
        />
      </IconButton>
      <Typography sx={{ color: theme.palette.text.primary }}>
        {t("user_profile")}
      </Typography>
    </MenuItem>
  );
};

export default UserProfileMenuItem;
