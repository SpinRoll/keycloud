// src/components/SignIn.js
import React, { useContext, useState } from "react";
import { Container, Box, Typography, Link, IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import Logo from "./logo/Logo";
import SignInForm from "./forms/auth/SignInForm";
import InfoModal from "./modals/InfoModal";
import { useTheme } from "@mui/material/styles";
import { pxToRem } from "../utils/pxToRem";
import { ThemeContext } from "../context/ThemeContext";
import useSignIn from "../hooks/auth/useSignIn";
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Campo aggiornato: ${name}, Valore: ${value}`); // Log per vedere i cambiamenti nei campi
    setFormData({ ...formData, [name]: value });
  };

  // Funzione per gestire la sottomissione del form (handleSignIn)
  const handleSignIn = (e) => {
    e.preventDefault();
    console.log("Dati inviati al backend:", formData); // Aggiungi questo log
    signIn(e, formData, API_URL); // Chiama la funzione di login
  };

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  if (!API_URL) {
    console.error(
      "REACT_APP_API_URL non è definito! Assicurati che la variabile d'ambiente sia impostata correttamente."
    );
  }

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
          handleSignIn={handleSignIn}
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
