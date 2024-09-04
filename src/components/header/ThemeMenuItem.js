// src/components/header/ThemeMenuItem.js
import React, { useContext } from "react";
import { MenuItem, IconButton, Typography } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { ThemeContext } from "../../context/ThemeContext";
import { pxToRem } from "../../utils/pxToRem";
import { useTheme } from "@mui/material/styles"; // Importa useTheme per accedere al tema

const ThemeMenuItem = ({ onClose }) => {
  const { toggleTheme, mode } = useContext(ThemeContext); // Usa il contesto del tema
  const theme = useTheme(); // Usa il tema corrente

  return (
    <MenuItem
      onClick={() => {
        toggleTheme();
        onClose(); // Chiude il menu
      }}
      sx={{ display: "flex", alignItems: "center", gap: pxToRem(10) }}>
      <IconButton>
        {mode === "dark" ? (
          <Brightness7 sx={{ color: theme.colors.pureWhite }} />
        ) : (
          <Brightness4 sx={{ color: theme.colors.gray }} />
        )}
      </IconButton>
      <Typography sx={{ color: theme.palette.text.primary }}>
        {mode === "dark" ? "Dark Mode" : "Light Mode"}
      </Typography>
    </MenuItem>
  );
};

export default ThemeMenuItem;
