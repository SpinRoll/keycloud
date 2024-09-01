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
  useTheme, // Importa useTheme per accedere al tema
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Brightness4, Brightness7, AccountCircle } from "@mui/icons-material"; // Icone per commutazione del tema
import { ThemeContext } from "../context/ThemeContext"; // Contesto del tema
import Logo from "./logo/Logo";
import { pxToRem } from "../utils/pxToRem";

function Header() {
  const { toggleTheme, mode } = useContext(ThemeContext); // Usa il contesto del tema
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme(); // Usa il tema corrente

  // Funzione per aprire il menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Funzione per chiudere il menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: theme.colors.primary,
        minHeight: pxToRem(70),
      }}>
      {" "}
      {/* Usa il colore primario dal tema */}
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: theme.colorsprimary,
          color: theme.palette.text.primary,
        }}>
        {/* Logo a sinistra */}
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
            }}>
            <Logo />
          </Box>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
            }}>
            <Typography
              variant="h6"
              sx={{
                color: theme.colors.pureWhite,
              }}>
              KeyCloud
            </Typography>
          </Box>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}>
            <IconButton
              aria-label="menu"
              onClick={handleMenuOpen}
              sx={{ color: theme.colors.pureWhite }} // Usa il colore dinamico dal tema
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Menu a discesa */}
        <Menu
          sx={{
            top: pxToRem(15),
          }}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}>
          <MenuItem
            sx={{ display: "flex", alignItems: "center", gap: pxToRem(10) }}>
            <IconButton onClick={toggleTheme}>
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
          <MenuItem
            sx={{ display: "flex", alignItems: "center", gap: pxToRem(10) }}>
            <IconButton>
              <AccountCircle
                sx={{
                  color:
                    mode === "dark"
                      ? theme.colors.pureWhite
                      : theme.colors.gray,
                }}
              />
            </IconButton>
            <Typography sx={{ color: theme.palette.text.primary }}>
              {mode === "dark" ? "User Profile" : "User Profile"}
            </Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
