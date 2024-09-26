// src/components/SignIn.js
import React, { useContext, useState } from "react";
import { Container, Box, Typography, Link, IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import Logo from "components/logo/Logo";
import SignInForm from "components/forms/auth/SignInForm";
import InfoModal from "components/modals/InfoModal";
import { useTheme } from "@mui/material/styles";
import { pxToRem } from "utils/pxToRem";
import { ThemeContext } from "context/ThemeContext";
import useSignIn from "hooks/auth/useSignIn";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const theme = useTheme();
  const { toggleTheme, mode } = useContext(ThemeContext);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    signIn,
    error,
    mfaRequired,
    isModalOpen,
    successMessage,
    handleCloseModal,
    userName, // De-struttura userName dall'hook
    userSurname, // De-struttura userSurname dall'hook
  } = useSignIn();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    mfaToken: "",
  });

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: theme.palette.background.paper,
          padding: `${pxToRem(20)} ${pxToRem(32.38)} ${pxToRem(28)} ${pxToRem(
            24
          )}`,
          borderRadius: pxToRem(8),
          boxShadow: `0px ${pxToRem(0)} ${pxToRem(10)} #635FC7`,
          mt: pxToRem(75),
        }}>
        <Logo />
        <Typography
          component="h2"
          variant="h6"
          sx={{ color: theme.palette.text.primary }}>
          {t("signin_title")}
        </Typography>

        <SignInForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleSignIn={(e) => signIn(e, formData, API_URL)}
          error={error}
          mfaRequired={mfaRequired}
          t={t}
        />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
          }}>
          <IconButton
            onClick={toggleTheme}
            sx={{
              mt: pxToRem(2),
              alignSelf: "flex-start",
            }}>
            {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          <Typography
            component="p"
            variant="body2"
            sx={{ color: theme.palette.text.primary }}>
            {t("no_account")}{" "}
            <Link
              variant="body2"
              sx={{ color: theme.colors.primary, cursor: "pointer" }}
              onClick={() => navigate("/sign-up")}>
              {t("signup_link")}
            </Link>
          </Typography>
        </Box>
      </Box>

      {/* Modal di successo */}
      <InfoModal
        open={isModalOpen}
        onClose={handleCloseModal}
        dialogMessage={successMessage}
        userName={userName} // Passa il nome dell'utente
        userSurname={userSurname} // Passa il cognome dell'utente
      />
    </Container>
  );
}

export default SignIn;
