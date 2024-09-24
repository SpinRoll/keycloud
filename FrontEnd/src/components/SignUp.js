// src/components/SignUp.js
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
import axios from "axios"; // Importa axios
import { useTranslation } from "react-i18next"; // Hook per le traduzioni

function SignUp() {
  const theme = useTheme();
  const { toggleTheme, mode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const { t } = useTranslation(); // Uso delle traduzioni

  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    email: "",
    password: "",
  });

  const handleSignInClick = () => {
    navigate("/sign-in");
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // URL dell'API
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/api/auth/signup`, formData);
      console.log("User registered:", response.data);
      navigate("/dashboard"); // Naviga alla Dashboard dopo il successo
    } catch (error) {
      console.error("Errore durante la registrazione:", error.response.data);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
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
          <Box
            sx={{ display: "flex", flexDirection: "column", gap: pxToRem(16) }}>
            <CustomButton sx={{ mt: pxToRem(16) }} type="submit">
              {t("signup_button")}
            </CustomButton>
          </Box>
          <IconButton onClick={toggleTheme} sx={{ mt: pxToRem(2) }}>
            {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          <Typography
            component="p"
            variant="body2"
            sx={{ color: theme.palette.text.primary }}>
            {t("already_have_account")}{" "}
            <Link
              variant="body2"
              sx={{ color: theme.palette.primary.main, cursor: "pointer" }}
              onClick={handleSignInClick}>
              {t("signin_link")}
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default SignUp;
