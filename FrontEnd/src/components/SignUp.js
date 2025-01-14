// src/components/SignUp.js
import React, { useContext, useState } from "react";
import { Container, Box, Typography, IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import Logo from "./logo/Logo";
import SignUpForm from "./forms/auth/SignUpForm"; // Importa il form separato
import InfoModal from "./modals/InfoModal"; // Importa la modale
import { useTheme } from "@mui/material/styles";
import { pxToRem } from "../utils/pxToRem";
import { ThemeContext } from "../context/ThemeContext";
import useSignUp from "../hooks/auth/useSignUp"; // Importa il custom hook
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const theme = useTheme();
  const { toggleTheme, mode } = useContext(ThemeContext);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    signUp,
    error,
    isModalOpen,
    successMessage,
    handleCloseModal,
    userName, // De-struttura userName dall'hook
    userSurname, // De-struttura userSurname dall'hook
  } = useSignUp(); // Usa il custom hook

  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const handleSignInClick = () => {
    navigate("/sign-in");
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
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
          {t("signup_title")}
        </Typography>

        {/* Usa il form separato */}
        <SignUpForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleSignUp={(e) => signUp(e, formData, API_URL)}
          error={error}
          t={t}
          handleSignInClick={handleSignInClick}
        />

        {/* Icona per alternare il tema */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "felx-start",
            width: "100%",
          }}>
          <IconButton onClick={toggleTheme} sx={{ mt: pxToRem(2) }}>
            {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
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

export default SignUp;
