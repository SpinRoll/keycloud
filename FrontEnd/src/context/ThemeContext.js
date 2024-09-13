// src/context/ThemeContext.js
import React, { createContext, useMemo, useState } from "react"; // Importo React e gli hook necessari per creare il contesto e gestire lo stato
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles"; // Importo ThemeProvider da Material-UI per applicare il tema all'applicazione
import CssBaseline from "@mui/material/CssBaseline"; // Importo CssBaseline per resettare i CSS di base
import theme from "../theme"; // Importo il file di configurazione del tema

// Creo il contesto per gestire il tema dell'applicazione
export const ThemeContext = createContext(); // Creo il contesto per il tema

export const ThemeProvider = ({ children }) => {
  // Creo un componente provider per avvolgere l'applicazione e fornire il tema

  const [mode, setMode] = useState("dark"); // Inizializzo lo stato della modalità tema a "dark" (scuro)

  // Funzione per alternare tra il tema "light" (chiaro) e "dark" (scuro)
  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light")); // Se il tema corrente è "light", lo cambio a "dark" e viceversa
  };

  // Uso useMemo per memorizzare il valore del tema e rigenerarlo solo quando cambia la modalità
  const themeValue = useMemo(() => theme(mode), [mode]); // Genero il tema dinamicamente in base alla modalità corrente

  return (
    // Fornisco il contesto del tema e il provider di Material-UI
    <ThemeContext.Provider value={{ toggleTheme, mode }}>
      {" "}
      {/* Fornisco la funzione toggleTheme e la modalità corrente al contesto */}
      <MuiThemeProvider theme={themeValue}>
        {" "}
        {/* Applico il tema corrente utilizzando il ThemeProvider di Material-UI */}
        <CssBaseline />{" "}
        {/* Aggiungo CssBaseline per garantire che gli stili di base siano applicati in modo uniforme */}
        {children}{" "}
        {/* Renderizzo i componenti figli all'interno del provider del tema */}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
