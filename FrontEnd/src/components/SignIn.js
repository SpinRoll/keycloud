// src/components/SignIn.js
import React, { useContext, useState } from "react";
import { Container, Box, Typography, Link, IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import Logo from "./logo/Logo";
import SignInForm from "./forms/auth/SignInForm"; // Importa il nuovo form
import { useTheme } from "@mui/material/styles";
import { pxToRem } from "../utils/pxToRem";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next"; // Hook per le traduzioni
import InfoModal from "./modals/InfoModal";

function SignIn() {
  const theme = useTheme();
  const { toggleTheme, mode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const { t } = useTranslation(); // Uso delle traduzioni
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [userName, setUserName] = useState(""); // Nome dell'utente
  const [userSurname, setUserSurname] = useState(""); // Cognome dell'utente

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    mfaToken: "",
  });

  const [error, setError] = useState(""); // Stato per gestire gli errori
  const [mfaRequired, setMfaRequired] = useState(false); // Stato per gestire se l'MFA è richiesto

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("/api/auth/signin", formData);

      if (response.data.mfaRequired) {
        setMfaRequired(true);
        return;
      }

      // Salva il nome e cognome dell'utente dalla risposta
      const { nome, cognome } = response.data.result;
      setUserName(nome);
      setUserSurname(cognome);

      // Mostra il messaggio di benvenuto
      setSuccessMessage(t("signin_success"));
      setIsModalOpen(true);

      // Salva i token nel localStorage
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      localStorage.setItem("userId", response.data.result._id);

      // Naviga alla dashboard dopo 2 secondi
      setTimeout(() => {
        handleCloseModal();
      }, 2000);
    } catch (error) {
      setError(
        error.response ? error.response.data.message : t("signin_error")
      );
    }
  };
  // Funzione per chiudere il modal
  const handleCloseModal = () => {
    setIsModalOpen(false); // Chiudi il modal
    navigate("/dashboard"); // Naviga alla dashboard
  };

  const handleSignUpClick = () => {
    navigate("/sign-up");
  };

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

        {/* Usa il nuovo componente SignInForm */}
        <SignInForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleSignIn={handleSignIn}
          error={error}
          t={t}
          mfaRequired={mfaRequired}
        />

        {/* Recover email */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "felx-start",
            width: "100%",
          }}>
          <Typography
            component="p"
            variant="body2"
            sx={{
              color: theme.palette.text.primary,
              mt: pxToRem(8),
              mb: pxToRem(16),
            }}>
            {t("forgot_password")}{" "}
            <Link
              variant="body2"
              sx={{ color: theme.palette.primary.main, cursor: "pointer" }}
              href="/recover-email">
              {t("recover_password")}
            </Link>
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "felx-start",
            width: "100%",
          }}>
          <Typography
            component="p"
            variant="body2"
            sx={{ color: theme.palette.text.primary }}>
            {t("no_account")}{" "}
            <Link
              variant="body2"
              sx={{ color: theme.colors.primary, cursor: "pointer" }}
              onClick={handleSignUpClick}>
              {t("signup_link")}
            </Link>
          </Typography>
        </Box>
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
      <InfoModal
        open={isModalOpen}
        onClose={handleCloseModal}
        dialogMessage={successMessage}
        userName={userName}
        userSurname={userSurname}
      />
    </Container>
  );
}

export default SignIn;
