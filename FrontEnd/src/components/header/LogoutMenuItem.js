// src/components/header/LogoutMenuItem.js
import React from "react";
import { MenuItem, IconButton, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate, useLocation } from "react-router-dom"; // Importa useLocation
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { pxToRem } from "../../utils/pxToRem";

function LogoutMenuItem({ onClose }) {
  const navigate = useNavigate();
  const location = useLocation(); // Ottieni l'URL corrente
  const theme = useTheme(); // Usa il tema corrente
  const { t } = useTranslation(); // Usa il hook useTranslation per la traduzione

  // Definisci le rotte su cui il logout non deve essere disponibile
  const isAuthPage =
    location.pathname === "/sign-in" || location.pathname === "/sign-up";

  const handleLogout = () => {
    // Rimuovi il token e le informazioni dell'utente dal localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Chiudi il menu prima di reindirizzare
    onClose();

    // Reindirizza alla schermata di login dopo il logout
    navigate("/sign-in");
  };

  return (
    <MenuItem
      onClick={handleLogout}
      sx={{
        alignItems: "center",
        gap: pxToRem(10),
        display: isAuthPage ? "none" : "flex",
        cursor: isAuthPage ? "not-allowed" : "pointer", // Mostra un cursore disabilitato
      }}>
      <IconButton disabled={isAuthPage}>
        <LogoutIcon
          sx={{
            color:
              theme.palette.mode === "dark"
                ? theme.colors.pureWhite
                : theme.colors.gray,
          }}
        />
      </IconButton>
      <Typography>{t("logout")}</Typography>
    </MenuItem>
  );
}

export default LogoutMenuItem;
