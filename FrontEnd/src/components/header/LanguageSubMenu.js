import React from "react";
import { Menu, MenuItem, Typography } from "@mui/material";
import ReactCountryFlag from "react-country-flag";
import { useTheme } from "@mui/material/styles";
import { pxToRem } from "../../utils/pxToRem";
import { useTranslation } from "react-i18next";

const LanguageSubMenu = ({ anchorEl, onClose }) => {
  const theme = useTheme();
  const { i18n, t } = useTranslation();

  // Cambio la lingua e chiudo il menu
  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang); // Salvo la lingua scelta nel localStorage
    onClose();
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      sx={{ mt: pxToRem(3) }}>
      {/* Lingua Inglese */}
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
          {t("english")}
        </Typography>
      </MenuItem>

      {/* Lingua Italiana */}
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
          {t("italian")}
        </Typography>
      </MenuItem>
    </Menu>
  );
};

export default LanguageSubMenu;
