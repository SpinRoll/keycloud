import React from "react";
import { Box } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import logoDesktop from "../assets/logo_desktop.png";
import logoMobile from "../assets/logo_mobile.png";

function Logo() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      component="img"
      src={isMobile ? logoMobile : logoDesktop}
      alt="KeyCloud Logo"
      sx={{
        maxWidth: isMobile ? "70px" : "70px", // Dimensione per mobile e desktop
        width: "100%",
      }}
    />
  );
}

export default Logo;
