// src/components/RecoverEmail.js
import React, { useState } from "react";
import { Container, Box, Typography, Link } from "@mui/material";
import CustomTextField from "./customComponents/CustomTextField";
import CustomButton from "./customComponents/CustomButton";
import { useTheme } from "@mui/material/styles";
import { pxToRem } from "../utils/pxToRem";
import axios from "axios";
import LoadingSpinner from "../components/customComponents/LoadingSpinner";
import { useTranslation } from "react-i18next";

const RecoverEmail = () => {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const [timeoutActive, setTimeoutActive] = useState(false); // Stato per attivare il timeout
  // Funzione per validare l'email
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex di base per l'email
    return regex.test(email); // Ritorna true se l'email è valida
  };

  // Funzione per gestire l'invio della richiesta di reset password
  const handleRecoverEmail = async (e) => {
    e.preventDefault();
    if (timeoutActive) return; // Evita ulteriori invii se il timeout è attivo
    setLoading(true);
    setError("");
    setMessage("");

    // Prevenzione dell'invio di email vuote
    if (!email) {
      setError(t("email_required"));
      setLoading(false);
      return;
    }

    // Verifica se l'email è valida
    if (!validateEmail(email)) {
      setError(t("invalid_email_format")); // Mostra un messaggio di errore per email non valida
      setLoading(false);
      return;
    }

    try {
      // eslint-disable-next-line
      const response = await axios.post("/api/auth/recover-email", { email });
      setMessage(t("success_recovery_email"));

      // Attiva il timeout per 30 secondi
      setTimeoutActive(true);
      setTimeout(() => setTimeoutActive(false), 30000); // Timeout di 30 secondi
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError(t("email_not_found"));
      } else {
        setError(t("error_recovery_email"));
      }
    } finally {
      setLoading(false);
    }
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
        <Typography
          component="h2"
          variant="h6"
          sx={{ color: theme.palette.text.primary }}>
          {t("recover_email")}
        </Typography>

        <Box
          component="form"
          noValidate
          onSubmit={handleRecoverEmail}
          sx={{ mt: pxToRem(8) }}>
          <CustomTextField
            label="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />

          {message && (
            <Typography sx={{ color: "green", mt: 2 }}>{message}</Typography>
          )}
          {error && (
            <Typography sx={{ color: "red", mt: 2 }}>{error}</Typography>
          )}

          <CustomButton
            type="submit"
            disabled={loading}
            sx={{ mt: pxToRem(16) }}>
            {loading ? <LoadingSpinner size={20} /> : t("send_recovery_email")}
          </CustomButton>

          <Link
            href="/sign-in"
            sx={{ mt: pxToRem(16), display: "block", textAlign: "center" }}>
            {t("back_to_sign_in")}
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default RecoverEmail;
