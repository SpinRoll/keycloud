// src/components/header/LanguageMenuItem.js
import React, { useState } from "react"; // Importo React e useState per gestire lo stato locale del componente
import { MenuItem, IconButton, Typography } from "@mui/material"; // Importo i componenti Material-UI necessari
import { pxToRem } from "../../utils/pxToRem"; // Funzione di utilità per convertire px in rem
import { useTheme } from "@mui/material/styles"; // Importo useTheme per accedere al tema corrente
import LanguageSubMenu from "./LanguageSubMenu"; // Importo il sotto-menu per la selezione della lingua
import { useTranslation } from "react-i18next"; // Importo il hook useTranslation per la gestione delle traduzioni
import ReactCountryFlag from "react-country-flag"; // Importo ReactCountryFlag per mostrare le bandiere delle lingue

const LanguageMenuItem = ({ onClose }) => {
  // Creo un componente funzionale che riceve onClose come prop

  const [languageAnchorEl, setLanguageAnchorEl] = useState(null); // Stato per il sotto-menu delle lingue
  const theme = useTheme(); // Uso il tema corrente per gli stili
  const { t, i18n } = useTranslation(); // Uso useTranslation per ottenere la funzione di traduzione e l'oggetto i18n

  // Funzione per aprire il sotto-menu delle lingue
  const handleLanguageMenuOpen = (event) => {
    setLanguageAnchorEl(event.currentTarget); // Imposto l'elemento di ancoraggio per il sotto-menu
  };

  // Funzione per chiudere il sotto-menu delle lingue
  const handleLanguageMenuClose = () => {
    setLanguageAnchorEl(null); // Resetta l'elemento di ancoraggio per chiudere il sotto-menu
  };

  // Determina la bandiera da mostrare in base alla lingua corrente
  const currentLanguageFlag = i18n.language === "en" ? "US" : "IT"; // Controllo la lingua corrente per decidere quale bandiera mostrare

  return (
    <>
      {/* MenuItem per aprire il sotto-menu delle lingue */}
      <MenuItem
        onClick={handleLanguageMenuOpen} // Quando si clicca, apre il sotto-menu delle lingue
        sx={{ display: "flex", alignItems: "center", gap: pxToRem(10) }} // Stili per il menu item
      >
        {/* Icona per la lingua corrente con la bandiera */}
        <IconButton>
          <ReactCountryFlag
            countryCode={currentLanguageFlag} // Bandiera basata sulla lingua corrente
            svg // Utilizza l'immagine SVG della bandiera
            style={{
              width: pxToRem(24), // Dimensione della bandiera
              height: pxToRem(24), // Dimensione della bandiera
            }}
          />
        </IconButton>
        {/* Testo per indicare la selezione della lingua */}
        <Typography sx={{ color: theme.palette.text.primary }}>
          {t("language")}{" "}
          {/* Usa la funzione t per ottenere il testo tradotto */}
        </Typography>
      </MenuItem>

      {/* Sotto-menu per la selezione della lingua */}
      <LanguageSubMenu
        anchorEl={languageAnchorEl} // Posizione dell'ancora per il sotto-menu
        onClose={handleLanguageMenuClose} // Funzione per chiudere il sotto-menu
      />
    </>
  );
};

export default LanguageMenuItem; // Esporto il componente per l'uso in altre parti dell'app
