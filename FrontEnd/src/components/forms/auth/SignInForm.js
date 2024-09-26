// src/components/forms/auth/SignInForm.js
import React from "react";
import { Box, Typography, Link } from "@mui/material";
import CustomTextField from "../../customComponents/CustomTextField";
import CustomButton from "../../customComponents/CustomButton";
import { pxToRem } from "../../../utils/pxToRem";

const SignInForm = ({
  formData,
  handleInputChange,
  handleSignIn,
  error,
  mfaRequired,
  t,
}) => (
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

    {mfaRequired && (
      <CustomTextField
        label={t("mfa_code_label")}
        name="mfaToken"
        type="text"
        onChange={handleInputChange}
      />
    )}

    {error && <Typography color="error">{error}</Typography>}

    <CustomButton sx={{ mt: pxToRem(16) }} type="submit">
      {t("signin_button")}
    </CustomButton>

    <Typography
      component="p"
      variant="body2"
      sx={{
        color: "text.primary",
        mt: pxToRem(8),
        mb: pxToRem(16),
      }}>
      {t("forgot_password")}{" "}
      <Link
        variant="body2"
        sx={{ color: "primary.main", cursor: "pointer" }}
        href="/recover-email">
        {t("recover_password")}
      </Link>
    </Typography>
  </Box>
);

export default SignInForm;
