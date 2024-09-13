// src/components/header/LanguageSubMenu.js
import React from "react"; // Importo React per creare componenti
import { Menu, MenuItem, Typography } from "@mui/material"; // Importo i componenti Material-UI necessari
import ReactCountryFlag from "react-country-flag"; // Importo ReactCountryFlag per mostrare le bandiere delle lingue
import { useTheme } from "@mui/material/styles"; // Importo useTheme per accedere al tema corrente
import { pxToRem } from "../../utils/pxToRem"; // Funzione di utilità per convertire px in rem
import { useTranslation } from "react-i18next"; // Importo il hook useTranslation per la gestione delle traduzioni

const LanguageSubMenu = ({ anchorEl, onClose }) => {
  // Creo un componente funzionale che riceve anchorEl e onClose come prop

  const theme = useTheme(); // Uso il tema corrente per applicare gli stili
  const { i18n, t } = useTranslation(); // Uso useTranslation per ottenere la funzione di traduzione e l'oggetto i18n

  // Funzione per cambiare la lingua
  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang); // Uso i18next per cambiare la lingua
    onClose(); // Chiudo il sotto-menu dopo aver selezionato la lingua
  };

  return (
    <Menu
      anchorEl={anchorEl} // Definisco l'elemento di ancoraggio per posizionare il menu
      open={Boolean(anchorEl)} // Controllo se il menu è aperto in base all'elemento di ancoraggio
      onClose={onClose} // Funzione per chiudere il menu
      sx={{ mt: pxToRem(3) }} // Stile per aggiungere un margine superiore al menu
    >
      {/* MenuItem per selezionare la lingua inglese */}
      <MenuItem onClick={() => handleLanguageChange("en")}>
        {/* Bandiera degli Stati Uniti per indicare la lingua inglese */}
        <ReactCountryFlag
          countryCode="US" // Codice del paese per gli Stati Uniti
          svg // Utilizza l'immagine SVG della bandiera
          style={{
            width: pxToRem(20), // Larghezza della bandiera
            height: pxToRem(20), // Altezza della bandiera
            marginRight: pxToRem(8), // Margine a destra per separare la bandiera dal testo
          }}
        />
        {/* Testo che mostra il nome della lingua inglese */}
        <Typography
          sx={{
            color:
              i18n.language === "en"
                ? theme.palette.primary.main // Colore primario se la lingua corrente è inglese
                : theme.palette.text.primary, // Colore del testo normale per le altre lingue
          }}>
          {t("english")}{" "}
          {/* Uso la funzione t per ottenere il nome tradotto della lingua */}
        </Typography>
      </MenuItem>

      {/* MenuItem per selezionare la lingua italiana */}
      <MenuItem onClick={() => handleLanguageChange("it")}>
        {/* Bandiera dell'Italia per indicare la lingua italiana */}
        <ReactCountryFlag
          countryCode="IT" // Codice del paese per l'Italia
          svg // Utilizza l'immagine SVG della bandiera
          style={{
            width: pxToRem(20), // Larghezza della bandiera
            height: pxToRem(20), // Altezza della bandiera
            marginRight: pxToRem(8), // Margine a destra per separare la bandiera dal testo
          }}
        />
        {/* Testo che mostra il nome della lingua italiana */}
        <Typography
          sx={{
            color:
              i18n.language === "it"
                ? theme.palette.primary.main // Colore primario se la lingua corrente è italiano
                : theme.palette.text.primary, // Colore del testo normale per le altre lingue
          }}>
          {t("italian")}{" "}
          {/* Uso la funzione t per ottenere il nome tradotto della lingua */}
        </Typography>
      </MenuItem>
    </Menu>
  );
};

export default LanguageSubMenu; // Esporto il componente per l'uso in altre parti dell'app
