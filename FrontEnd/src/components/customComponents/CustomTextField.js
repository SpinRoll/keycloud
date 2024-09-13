// src/components/customComponents/CustomTextField.js
import React from "react";
import { TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const CustomTextField = ({ label, name, type = "text", ...props }) => {
  const theme = useTheme();
  return (
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      label={label}
      name={name}
      type={type}
      autoComplete={name}
      InputLabelProps={{ style: { color: theme.palette.text.primary } }}
      InputProps={{
        style: {
          color: theme.palette.text.primary,
          borderColor: theme.palette.text.secondary,
        },
      }}
      {...props}
    />
  );
};

export default CustomTextField;
