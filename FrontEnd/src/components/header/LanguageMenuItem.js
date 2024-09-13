// src/components/header/LanguageMenuItem.js
import React, { useState } from "react";
import { MenuItem, IconButton, Typography } from "@mui/material";
import { pxToRem } from "../../utils/pxToRem";
import { useTheme } from "@mui/material/styles";
import LanguageSubMenu from "./LanguageSubMenu"; // Importa il sotto-menu per la lingua
import { useTranslation } from "react-i18next"; // Importa il hook useTranslation
import ReactCountryFlag from "react-country-flag"; // Importa ReactCountryFlag
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"; // Importa l'icona ArrowDropDown
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp"; // Importa l'icona ArrowDropUp

const LanguageMenuItem = ({ onClose }) => {
  const [languageAnchorEl, setLanguageAnchorEl] = useState(null); // Stato per il sotto-menu della lingua
  const theme = useTheme(); // Usa il tema corrente
  const { t, i18n } = useTranslation(); // Usa il hook useTranslation per ottenere la funzione di traduzione

  // Funzione per aprire il sotto-menu delle lingue
  const handleLanguageMenuOpen = (event) => {
    setLanguageAnchorEl(event.currentTarget);
  };

  // Funzione per chiudere il sotto-menu delle lingue
  const handleLanguageMenuClose = () => {
    setLanguageAnchorEl(null);
  };

  // Determina la bandiera da mostrare in base alla lingua corrente
  const currentLanguageFlag = i18n.language === "en" ? "US" : "IT";

  // Determina se il menu è aperto
  const isMenuOpen = Boolean(languageAnchorEl);

  return (
    <>
      {/* MenuItem principale per aprire il sotto-menu delle lingue */}
      <MenuItem
        onClick={handleLanguageMenuOpen}
        sx={{ display: "flex", alignItems: "center", gap: pxToRem(10) }}>
        <IconButton>
          <ReactCountryFlag
            countryCode={currentLanguageFlag} // Bandiera in base alla lingua
            svg
            style={{
              width: pxToRem(24),
              height: pxToRem(24),
            }}
          />
        </IconButton>
        <Typography sx={{ color: theme.palette.text.primary }}>
          {t("language")}
        </Typography>
        {/* Icona dinamica che cambia da drop-down a drop-up in base allo stato del menu */}
        {isMenuOpen ? (
          <ArrowDropUpIcon
            sx={{
              color:
                theme.palette.mode === "dark"
                  ? theme.colors.pureWhite
                  : theme.colors.gray,
            }}
          />
        ) : (
          <ArrowDropDownIcon
            sx={{
              color:
                theme.palette.mode === "dark"
                  ? theme.colors.pureWhite
                  : theme.colors.gray,
            }}
          />
        )}
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
