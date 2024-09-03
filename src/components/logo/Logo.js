// src/components/logo/Logo.js
import React from "react";
import { Box } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom"; // Importa Link da react-router-dom
import logoDesktop from "../../assets/logo_desktop.png";
import logoMobile from "../../assets/logo_mobile.png";

function Logo() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Link to="/" style={{ textDecoration: "none" }}>
      {" "}
      {/* Usa Link per navigare alla home page */}
      <Box
        component="img"
        src={isMobile ? logoMobile : logoDesktop}
        alt="KeyCloud Logo"
        sx={{
          maxWidth: isMobile ? "70px" : "70px", // Dimensione per mobile e desktop
          width: "100%",
          cursor: "pointer", // Aggiungi un cursore puntatore per indicare che è cliccabile
        }}
      />
    </Link>
  );
}

export default Logo;
