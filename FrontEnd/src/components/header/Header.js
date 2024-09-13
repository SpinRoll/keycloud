// src/components/header/Header.js
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import { pxToRem } from "../../utils/pxToRem";
import Logo from "../logo/Logo";
import ThemeMenuItem from "./ThemeMenuItem";
import UserProfileMenuItem from "./UserProfileMenuItem";
import LanguageMenuItem from "./LanguageMenuItem";

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme(); // Usa il tema corrente

  // Funzione per aprire il menu generale
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Funzione per chiudere il menu generale
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
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: theme.colors.primary,
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
            {/* Icona per il menu generale */}
            <IconButton
              aria-label="menu"
              onClick={handleMenuOpen}
              sx={{ color: theme.colors.pureWhite }}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Menu a discesa per le altre opzioni */}
        <Menu
          sx={{
            top: pxToRem(15),
          }}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}>
          <ThemeMenuItem onClose={handleMenuClose} />
          <UserProfileMenuItem onClose={handleMenuClose} />
          <LanguageMenuItem onClose={handleMenuClose} />
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
