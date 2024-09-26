// src/context/ThemeContext.js
import React, { createContext, useMemo, useState, useEffect } from "react"; // Importo gli hook necessari
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../theme";

// Creo il contesto per gestire il tema dell'applicazione
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Funzione per ottenere il tema dal localStorage o usare "dark" di default
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme : "dark"; // Di default "dark" se non c'è nulla in localStorage
  };

  // Inizializza lo stato del tema con il valore ottenuto da localStorage
  const [mode, setMode] = useState(getInitialTheme);

  // Funzione per alternare tra il tema "light" e "dark"
  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  // Uso useMemo per memorizzare il valore del tema e rigenerarlo solo quando cambia la modalità
  const themeValue = useMemo(() => theme(mode), [mode]);

  // Salva il tema selezionato in localStorage ogni volta che cambia
  useEffect(() => {
    localStorage.setItem("theme", mode); // Salva il tema nel localStorage
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ toggleTheme, mode }}>
      <MuiThemeProvider theme={themeValue}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
