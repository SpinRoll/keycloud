import { createTheme } from '@mui/material/styles';

const colors = {
  primary: '#00D4FF',  // Blu neon
  primaryHover: '#00B3CC',  // Blu neon scuro
  secondary: '#F3F4F6',  // Grigio chiaro
  backgroundDark: '#0B0C10',  // Nero/Grigio scuro
  backgroundLight: '#1F2833',  // Grigio molto scuro per i componenti
  textPrimary: '#C5C6C7',  // Grigio chiaro per il testo
  textSecondary: '#66FCF1',  // Colore accento (verde lime)
  textOnPrimary: '#0B0C10',  // Nero su sfondo primario
  googleButton: '#4285F4',  // Colore per il pulsante Google
  facebookButton: '#3b5998',  // Colore per il pulsante Facebook
};

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
    background: {
      default: colors.backgroundDark,
      paper: colors.backgroundLight,
    },
    text: {
      primary: colors.textPrimary,
      secondary: colors.textSecondary,
    },
  },
  colors,  // Esporta i colori come parte del tema per un facile accesso in tutta l'app
});

export default theme;
