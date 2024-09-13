// src/components/header/ThemeMenuItem.js
import React, { useContext } from "react"; // Importo React e useContext per accedere ai contesti
import { MenuItem, IconButton, Typography } from "@mui/material"; // Importo i componenti Material-UI necessari
import { Brightness4, Brightness7 } from "@mui/icons-material"; // Importo le icone per la commutazione del tema
import { ThemeContext } from "../../context/ThemeContext"; // Importo il contesto del tema personalizzato
import { pxToRem } from "../../utils/pxToRem"; // Funzione di utilità per convertire px in rem
import { useTheme } from "@mui/material/styles"; // Importo useTheme per accedere al tema corrente
import { useTranslation } from "react-i18next"; // Importo il hook useTranslation per la gestione delle traduzioni

const ThemeMenuItem = ({ onClose }) => {
  // Creo un componente funzionale per l'elemento di menu del tema

  const { toggleTheme, mode } = useContext(ThemeContext); // Uso il contesto del tema per ottenere la funzione di toggle e la modalità corrente
  const theme = useTheme(); // Uso il tema corrente per applicare gli stili
  const { t } = useTranslation(); // Uso il hook useTranslation per ottenere la funzione di traduzione

  return (
    // MenuItem per la selezione del tema
    <MenuItem
      onClick={() => {
        toggleTheme(); // Commutazione del tema tra chiaro e scuro
        onClose(); // Chiude il menu dopo la selezione
      }}
      sx={{ display: "flex", alignItems: "center", gap: pxToRem(10) }} // Stili per il menu item
    >
      {/* Icona per la selezione del tema */}
      <IconButton>
        {mode === "dark" ? (
          <Brightness7 sx={{ color: theme.colors.pureWhite }} /> // Icona del sole per la modalità scura
        ) : (
          <Brightness4 sx={{ color: theme.colors.gray }} /> // Icona della luna per la modalità chiara
        )}
      </IconButton>
      {/* Testo che descrive il tema corrente */}
      <Typography sx={{ color: theme.palette.text.primary }}>
        {mode === "dark" ? t("light_mode") : t("dark_mode")}{" "}
        {/* Usa la funzione t per ottenere la traduzione del testo per il tema */}
      </Typography>
    </MenuItem>
  );
};

export default ThemeMenuItem; // Esporto il componente per l'uso in altre parti dell'app
