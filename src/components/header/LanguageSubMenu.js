import React from "react";
import { Menu, MenuItem, Typography } from "@mui/material";
import ReactCountryFlag from "react-country-flag";
import { useTheme } from "@mui/material/styles"; // Importa useTheme per accedere al tema
import { pxToRem } from "../../utils/pxToRem";
import { useTranslation } from "react-i18next"; // Importa useTranslation

const LanguageSubMenu = ({ anchorEl, onClose }) => {
  const theme = useTheme(); // Usa il tema corrente
  const { i18n, t } = useTranslation(); // Usa i18next per cambiare la lingua

  // Funzione per cambiare la lingua
  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang); // Cambia la lingua con i18next
    onClose(); // Chiudi il sotto-menu dopo aver selezionato la lingua
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      sx={{ mt: pxToRem(3) }}>
      <MenuItem onClick={() => handleLanguageChange("en")}>
        <ReactCountryFlag
          countryCode="US"
          svg
          style={{
            width: pxToRem(20),
            height: pxToRem(20),
            marginRight: pxToRem(8),
          }}
        />
        <Typography
          sx={{
            color:
              i18n.language === "en"
                ? theme.palette.primary.main
                : theme.palette.text.primary,
          }}>
          {t("english")} {/* Traduzione del nome della lingua */}
        </Typography>
      </MenuItem>
      <MenuItem onClick={() => handleLanguageChange("it")}>
        <ReactCountryFlag
          countryCode="IT"
          svg
          style={{
            width: pxToRem(20),
            height: pxToRem(20),
            marginRight: pxToRem(8),
          }}
        />
        <Typography
          sx={{
            color:
              i18n.language === "it"
                ? theme.palette.primary.main
                : theme.palette.text.primary,
          }}>
          {t("italian")} {/* Traduzione del nome della lingua */}
        </Typography>
      </MenuItem>
    </Menu>
  );
};

export default LanguageSubMenu;
