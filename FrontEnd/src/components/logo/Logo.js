// src/components/logo/Logo.js
import React from "react";
import { Box } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Link, useLocation } from "react-router-dom"; // Importa useLocation per ottenere l'URL corrente
import logoDesktop from "../../assets/logo_desktop.png";
import logoMobile from "../../assets/logo_mobile.png";

function Logo() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation(); // Ottieni l'URL corrente

  // Definisci le rotte su cui il logo non deve essere cliccabile
  const isAuthPage =
    location.pathname === "/sign-in" || location.pathname === "/sign-up";

  return (
    // Se siamo su una pagina di autenticazione, il logo non è cliccabile
    <>
      {isAuthPage ? (
        // Solo l'immagine senza il Link, non è cliccabile
        <Box
          component="img"
          src={isMobile ? logoMobile : logoDesktop}
          alt="KeyCloud Logo"
          sx={{
            maxWidth: isMobile ? "70px" : "70px",
            width: "100%",
          }}
        />
      ) : (
        // Se non siamo su una pagina di autenticazione, il logo è cliccabile
        <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <Box
            component="img"
            src={isMobile ? logoMobile : logoDesktop}
            alt="KeyCloud Logo"
            sx={{
              maxWidth: isMobile ? "70px" : "70px",
              width: "100%",
              cursor: "pointer", // Aggiungi il cursore solo se cliccabile
            }}
          />
        </Link>
      )}
    </>
  );
}

export default Logo;
