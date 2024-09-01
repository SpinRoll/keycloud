// src/theme.js
import { createTheme } from "@mui/material/styles";

// Definizione dei colori personalizzati
const colors = {
  primary: "#635FC7",
  secondary: "#A8A4FF",
  darkBlue: "#000112",
  darkGray: "#2B2C37",
  gray: "#707070",
  veryDarkGray: "#20212C",
  mediumGray: "#828FA3",
  lightBlue: "#E4EBFA",
  lightGray: "#F4F7FD",
  pureWhite: "#FFFFFF",
  red: "#EA5555",
  lightRed: "#FF9898",
};

// Funzione per ottenere i token di design in base alla modalità
const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
    ...(mode === "light"
      ? {
          // Modalità chiara
          background: {
            default: colors.lightGray, // Usa il nome 'lightGray'
            paper: colors.pureWhite, // Usa il nome 'pureWhite'
          },
          text: {
            primary: colors.darkBlue, // Usa il nome 'darkBlue'
            secondary: colors.mediumGray, // Usa il nome 'mediumGray'
          },
        }
      : {
          // Modalità scura
          background: {
            default: colors.veryDarkGray, // Usa il nome 'veryDarkGray'
            paper: colors.darkGray, // Usa il nome 'darkGray'
          },
          text: {
            primary: colors.pureWhite, // Usa il nome 'pureWhite'
            secondary: colors.mediumGray, // Usa il nome 'mediumGray'
          },
        }),
  },
  colors: {
    ...colors, // Includiamo l'oggetto colors direttamente qui
    dynamicColor: mode === "light" ? colors.darkBlue : colors.red, // Usa i nomi dei colori personalizzati
  },
});

const theme = (mode) => createTheme(getDesignTokens(mode));

export default theme;
