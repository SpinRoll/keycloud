// src/components/SignIn.js
import React, { useContext, useState } from "react";
import { Container, Box, Typography, Link, IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import Logo from "./logo/Logo";
import CustomTextField from "./customComponents/CustomTextField";
import CustomButton from "./customComponents/CustomButton";
import { useTheme } from "@mui/material/styles";
import { pxToRem } from "../utils/pxToRem";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next"; // Hook per le traduzioni

function SignIn() {
  const theme = useTheme();
  const { toggleTheme, mode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const { t } = useTranslation(); // Uso delle traduzioni

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    mfaToken: "", // Aggiungi un campo per il codice MFA
  });

  const [error, setError] = useState(""); // Stato per gestire gli errori
  const [mfaRequired, setMfaRequired] = useState(false); // Stato per gestire se l'MFA è richiesto

  // Funzione per gestire i cambiamenti degli input
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // URL dell'API
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  // Funzione per gestire la richiesta di login
  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(""); // Resetta l'errore prima di inviare la richiesta

    try {
      const response = await axios.post(`${API_URL}/api/auth/signin`, formData);

      // Se MFA è richiesto, chiedi il codice MFA
      if (response.data.mfaRequired) {
        setMfaRequired(true);
        return; // Fermiamo il flusso per chiedere il codice MFA
      }

      // Memorizza i token JWT nel localStorage
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      localStorage.setItem("userId", response.data.result._id);

      navigate("/dashboard"); // Naviga alla Dashboard dopo il successo
    } catch (error) {
      setError(
        error.response ? error.response.data.message : t("signin_error")
      );
    }
  };

  // Funzione per navigare alla pagina di sign-up
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
          sx={{
            color: theme.palette.text.primary,
            textAlign: "center",
          }}>
          {t("signin_title")}
        </Typography>

        {/* Form */}
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

          {/* Recover email */}
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

          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: pxToRem(16),
              mt: pxToRem(8),
            }}>
            <CustomButton type="submit">{t("signin_button")}</CustomButton>
          </Box>

          <IconButton onClick={toggleTheme} sx={{ mt: pxToRem(2) }}>
            {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>

          <Typography
            component="p"
            variant="body2"
            sx={{
              color: theme.palette.text.primary,
            }}>
            {t("no_account")}{" "}
            <Link
              variant="body2"
              sx={{ color: theme.colors.primary, cursor: "pointer" }}
              onClick={handleSignUpClick}>
              {t("signup_link")}
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default SignIn;
