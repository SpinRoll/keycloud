// src/components/Header.js
import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Box,
  Switch,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Brightness4, Brightness7 } from "@mui/icons-material"; // Icone per commutazione del tema
import { ThemeContext } from "../context/ThemeContext"; // Contesto del tema
import Logo from "./Logo";

function Header() {
  const { toggleTheme, mode } = useContext(ThemeContext); // Usa il contesto del tema
  const [anchorEl, setAnchorEl] = useState(null);

  // Funzione per aprire il menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Funzione per chiudere il menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar sx={{}} position="fixed">
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
        {/* Logo a sinistra */}
        <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
          <Logo />
          <Typography variant="h6" sx={{ ml: 2 }}>
            KeyCloud
          </Typography>
          {/* Burger menu a destra */}
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuOpen}>
            <MenuIcon />
          </IconButton>
        </Box>

        {/* Menu a discesa */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}>
          <MenuItem>
            <Switch
              checked={mode === "dark"}
              onChange={toggleTheme}
              icon={<Brightness7 />}
              checkedIcon={<Brightness4 />}
            />
            {mode === "dark" ? "Dark Mode" : "Light Mode"}
          </MenuItem>
          User Account
          {/* Aggiungi altri elementi del menu qui, se necessario */}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
