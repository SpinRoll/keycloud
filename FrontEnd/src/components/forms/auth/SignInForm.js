// src/components/forms/auth/SignInForm.js
import React from "react";
import { Box, Typography } from "@mui/material";
import CustomTextField from "../../customComponents/CustomTextField";
import CustomButton from "../../customComponents/CustomButton";
import { pxToRem } from "../../../utils/pxToRem";

const SignInForm = ({
  formData,
  handleInputChange,
  handleSignIn,
  error,
  t,
  mfaRequired,
}) => {
  return (
    <Box component="form" noValidate onSubmit={handleSignIn}>
      <CustomTextField
        label={t("email_label")}
        name="email"
        autoFocus
        onChange={handleInputChange}
      />
      <CustomTextField
        label={t("password_label")}
        name="password"
        type="password"
        onChange={handleInputChange}
      />

      {/* Mostra il campo MFA solo se richiesto */}
      {mfaRequired && (
        <CustomTextField
          label={t("mfa_code_label")}
          name="mfaToken"
          type="text"
          onChange={handleInputChange}
        />
      )}

      {/* Messaggio di errore */}
      {error && (
        <Typography color="error" variant="body2" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      {/* Bottone per inviare il form */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: pxToRem(16),
          mt: pxToRem(8),
        }}>
        <CustomButton
          sx={{
            mt: pxToRem(8),
            mb: pxToRem(8),
          }}
          type="submit">
          {t("signin_button")}
        </CustomButton>
      </Box>
    </Box>
  );
};

export default SignInForm;
