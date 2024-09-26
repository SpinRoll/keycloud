// src/components/forms/auth/SignUpForm.js
import React from "react";
import { Box, Typography, Link } from "@mui/material";
import CustomTextField from "../../customComponents/CustomTextField";
import CustomButton from "../../customComponents/CustomButton";
import { pxToRem } from "../../../utils/pxToRem";

const SignUpForm = ({
  formData,
  handleInputChange,
  handleSignUp,
  error,
  t,
  handleSignInClick,
}) => {
  return (
    <Box component="form" noValidate onSubmit={handleSignUp}>
      <CustomTextField
        label={t("name_label")}
        name="nome"
        autoFocus
        onChange={handleInputChange}
      />
      <CustomTextField
        label={t("surname_label")}
        name="cognome"
        onChange={handleInputChange}
      />
      <CustomTextField
        label={t("email_label")}
        name="email"
        onChange={handleInputChange}
      />
      <CustomTextField
        label={t("password_label")}
        name="password"
        type="password"
        onChange={handleInputChange}
      />

      <Box sx={{ display: "flex", flexDirection: "column", gap: pxToRem(16) }}>
        <CustomButton sx={{ mt: pxToRem(16) }} type="submit">
          {t("signup_button")}
        </CustomButton>
      </Box>

      {/* Mostra eventuali errori */}
      {error && (
        <Typography color="error" variant="body2" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      <Typography
        component="p"
        variant="body2"
        sx={{ color: "text.primary", mt: pxToRem(2) }}>
        {t("already_have_account")}{" "}
        <Link
          variant="body2"
          sx={{ color: "primary.main", cursor: "pointer" }}
          onClick={handleSignInClick}>
          {t("signin_link")}
        </Link>
      </Typography>
    </Box>
  );
};

export default SignUpForm;
