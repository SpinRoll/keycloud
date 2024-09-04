// src/components/header/UserProfileMenuItem.js
import React from "react";
import { MenuItem, IconButton, Typography } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles"; // Importa useTheme per accedere al tema
import { pxToRem } from "../../utils/pxToRem";

const UserProfileMenuItem = ({ onClose }) => {
  const theme = useTheme(); // Usa il tema corrente

  return (
    <MenuItem
      onClick={onClose}
      sx={{ display: "flex", alignItems: "center", gap: pxToRem(10) }}>
      <IconButton>
        <AccountCircle
          sx={{
            color:
              theme.palette.mode === "dark"
                ? theme.colors.pureWhite
                : theme.colors.gray,
          }}
        />
      </IconButton>
      <Typography sx={{ color: theme.palette.text.primary }}>
        User Profile
      </Typography>
    </MenuItem>
  );
};

export default UserProfileMenuItem;
