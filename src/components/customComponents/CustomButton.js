// src/components/CustomButton.js
import React from "react";
import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const CustomButton = ({ children, variant = "contained", ...props }) => {
  const theme = useTheme();
  const isContained = variant === "contained";
  return (
    <Button
      fullWidth
      variant={variant}
      sx={{
        mt: 2,
        mb: 2,
        backgroundColor: isContained ? theme.colors.primary : "transparent",
        color: isContained ? theme.colors.pureWhite : theme.colors.primary,
        borderColor: theme.colors.primary,
        "&:hover": {
          backgroundColor: isContained
            ? theme.colors.secondary || theme.colors.primary
            : theme.colors.lightBlue,
        },
      }}
      {...props}>
      {children}
    </Button>
  );
};

export default CustomButton;
