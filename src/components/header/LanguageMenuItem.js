import React, { useState } from "react";
import { MenuItem, IconButton, Typography } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import { pxToRem } from "../../utils/pxToRem";
import { useTheme } from "@mui/material/styles";
import LanguageSubMenu from "./LanguageSubMenu"; // Importa il sotto-menu per la lingua
import { useTranslation } from "react-i18next"; // Importa il hook useTranslation

const LanguageMenuItem = ({ onClose }) => {
  const [languageAnchorEl, setLanguageAnchorEl] = useState(null); // Stato per il sotto-menu della lingua
  const theme = useTheme(); // Usa il tema corrente
  const { t } = useTranslation(); // Usa il hook useTranslation per ottenere la funzione di traduzione

  // Funzione per aprire il sotto-menu delle lingue
  const handleLanguageMenuOpen = (event) => {
    setLanguageAnchorEl(event.currentTarget);
  };

  // Funzione per chiudere il sotto-menu delle lingue
  const handleLanguageMenuClose = () => {
    setLanguageAnchorEl(null);
  };

  return (
    <>
      <MenuItem
        onClick={handleLanguageMenuOpen}
        sx={{ display: "flex", alignItems: "center", gap: pxToRem(10) }}>
        <IconButton>
          <LanguageIcon sx={{ color: theme.colors.pureWhite }} />
        </IconButton>
        <Typography sx={{ color: theme.palette.text.primary }}>
          {t("language")}{" "}
          {/* Usa la funzione t per ottenere il testo tradotto */}
        </Typography>
      </MenuItem>
      {/* Sotto-menu per la selezione della lingua */}
      <LanguageSubMenu
        anchorEl={languageAnchorEl}
        onClose={handleLanguageMenuClose}
      />
    </>
  );
};

export default LanguageMenuItem;
