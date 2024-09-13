// src/components/logo/Logo.js
import React from "react"; // Importo React per creare componenti
import { Box } from "@mui/material"; // Importo Box da Material-UI per gestire il layout e gli stili del logo
import useMediaQuery from "@mui/material/useMediaQuery"; // Importo useMediaQuery per gestire le query di media per il responsive design
import { useTheme } from "@mui/material/styles"; // Importo useTheme per accedere al tema corrente
import { Link } from "react-router-dom"; // Importo Link da react-router-dom per gestire la navigazione interna
import logoDesktop from "../../assets/logo_desktop.png"; // Importo l'immagine del logo per la visualizzazione desktop
import logoMobile from "../../assets/logo_mobile.png"; // Importo l'immagine del logo per la visualizzazione mobile

function Logo() {
  const theme = useTheme(); // Uso il tema corrente per applicare le regole di stile e breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Definisco una query per verificare se la visualizzazione è mobile

  return (
    // Uso Link per navigare alla home page al clic sul logo
    <Link to="/" style={{ textDecoration: "none" }}>
      {/* Componente Box di Material-UI per l'immagine del logo */}
      <Box
        component="img" // Specifico che il Box è un'immagine
        src={isMobile ? logoMobile : logoDesktop} // Utilizzo il logo mobile o desktop in base alla query di media
        alt="KeyCloud Logo" // Alt text per l'accessibilità
        sx={{
          maxWidth: isMobile ? "70px" : "70px", // Imposto la dimensione massima del logo per mobile e desktop
          width: "100%", // Imposto la larghezza al 100% per rendere il logo reattivo
          cursor: "pointer", // Aggiungo un cursore a puntatore per indicare che il logo è cliccabile
        }}
      />
    </Link>
  );
}

export default Logo; // Esporto il componente Logo per l'uso in altre parti dell'applicazione
