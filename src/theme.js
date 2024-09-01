// src/theme.js
import { createTheme } from "@mui/material/styles";

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      main: "#00D4FF", // Blu neon
    },
    secondary: {
      main: "#F3F4F6", // Grigio chiaro
    },
    ...(mode === "light"
      ? {
          // Modalità chiara
          background: {
            default: "#f5f5f5",
            paper: "#ffffff",
          },
          text: {
            primary: "#0B0C10", // Nero
            secondary: "#00B3CC", // Blu neon scuro
          },
        }
      : {
          // Modalità scura
          background: {
            default: "#0B0C10", // Nero/Grigio scuro
            paper: "#1F2833", // Grigio molto scuro per i componenti
          },
          text: {
            primary: "#C5C6C7", // Grigio chiaro per il testo
            secondary: "#66FCF1", // Colore accento
          },
        }),
  },
  colors: {
    primary: "#00D4FF",
    primaryHover: "#00B3CC",
    secondary: "#F3F4F6",
    backgroundDark: "#0B0C10",
    backgroundLight: "#1F2833",
    textPrimary: "#C5C6C7",
    textSecondary: "#66FCF1",
    textOnPrimary: "#0B0C10",
    googleButton: "#4285F4",
    facebookButton: "#3b5998",
  },
});

const theme = (mode) => createTheme(getDesignTokens(mode));

export default theme;
