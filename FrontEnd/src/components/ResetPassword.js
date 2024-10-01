// src/components/ResetPassword.js
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Box, Typography, Link } from "@mui/material";
import CustomTextField from "./customComponents/CustomTextField";
import CustomButton from "./customComponents/CustomButton";
import { useTheme } from "@mui/material/styles";
import { pxToRem } from "../utils/pxToRem";
import axios from "axios";
import LoadingSpinner from "../components/customComponents/LoadingSpinner";
import { useTranslation } from "react-i18next";

const ResetPassword = () => {
  const theme = useTheme();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation(); // Per ottenere il token dalla query string

  // Funzione per gestire l'invio della nuova password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    // Controllo se le password coincidono
    if (password !== confirmPassword) {
      setError(t("passwords_do_not_match"));
      setLoading(false);
      return;
    }

    // Ottieni il token dalla query string
    const token = new URLSearchParams(location.search).get("token");

    try {
      // eslint-disable-next-line
      const response = await axios.post("/api/auth/reset-password", {
        password,
        token,
      });
      setMessage(t("password_reset_success"));
      navigate("/sign-in"); // Reindirizza l'utente alla pagina di login dopo il successo
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError(t("error_reset_password"));
      } else {
        // Se il token è scaduto
        setError(t("reset_link_expired"));
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
          padding: `${pxToRem(20)} ${pxToRem(32.38)} ${pxToRem(28)} ${pxToRem(24)}`,
          borderRadius: pxToRem(8),
          boxShadow: `0px ${pxToRem(0)} ${pxToRem(10)} #635FC7`,
          mt: pxToRem(75),
        }}
      >
        <Typography component="h2" variant="h6" sx={{ color: theme.palette.text.primary }}>
          {t("reset_password")}
        </Typography>

        <Box component="form" noValidate onSubmit={handleResetPassword} sx={{ mt: pxToRem(8) }}>
          <CustomTextField
            label={t("new_password")}
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
          <CustomTextField
            label={t("confirm_password")}
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {message && <Typography sx={{ color: "green", mt: 2 }}>{message}</Typography>}
          {error && <Typography sx={{ color: "red", mt: 2 }}>{error}</Typography>}

          <CustomButton type="submit" disabled={loading} sx={{ mt: pxToRem(16) }}>
            {loading ? <LoadingSpinner size={20} /> : t("reset_password")}
          </CustomButton>

          <Link href="/sign-in" sx={{ mt: pxToRem(16), display: "block", textAlign: "center" }}>
            {t("back_to_sign_in")}
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default ResetPassword;
