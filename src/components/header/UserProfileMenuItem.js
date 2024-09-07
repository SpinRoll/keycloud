// src/components/header/UserProfileMenuItem.js
import React from "react"; // Importo React per creare componenti
import { MenuItem, IconButton, Typography } from "@mui/material"; // Importo i componenti Material-UI necessari
import { AccountCircle } from "@mui/icons-material"; // Importo l'icona AccountCircle per il profilo utente
import { useTheme } from "@mui/material/styles"; // Importo useTheme per accedere al tema corrente
import { pxToRem } from "../../utils/pxToRem"; // Funzione di utilità per convertire px in rem
import { useTranslation } from "react-i18next"; // Importo il hook useTranslation per la gestione delle traduzioni

const UserProfileMenuItem = ({ onClose }) => {
  // Creo un componente funzionale che riceve onClose come prop

  const theme = useTheme(); // Uso il tema corrente per applicare gli stili
  const { t } = useTranslation(); // Uso useTranslation per ottenere la funzione di traduzione

  return (
    // MenuItem per l'opzione del profilo utente
    <MenuItem
      onClick={onClose} // Quando si clicca, chiude il menu
      sx={{ display: "flex", alignItems: "center", gap: pxToRem(10) }} // Stili per il menu item
    >
      {/* Icona per il profilo utente */}
      <IconButton>
        <AccountCircle
          sx={{
            color:
              theme.palette.mode === "dark" // Controllo la modalità del tema
                ? theme.colors.pureWhite // Se il tema è scuro, utilizza il colore bianco puro
                : theme.colors.gray, // Se il tema è chiaro, utilizza il colore grigio
          }}
        />
      </IconButton>
      {/* Testo per l'opzione del profilo utente */}
      <Typography sx={{ color: theme.palette.text.primary }}>
        {t("user_profile")}{" "}
        {/* Uso la funzione t per ottenere la traduzione del testo "User Profile" */}
      </Typography>
    </MenuItem>
  );
};

export default UserProfileMenuItem; // Esporto il componente per l'uso in altre parti dell'app
