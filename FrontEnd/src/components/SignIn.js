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
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import axios from "axios"; // Importa axios per le richieste HTTP

function SignIn() {
  const theme = useTheme();
  const { toggleTheme, mode } = useContext(ThemeContext);
  const navigate = useNavigate(); // Usa useNavigate per la navigazione
  const [formData, setFormData] = useState({ email: "", password: "" }); // Stato per i dati del modulo
  const [error, setError] = useState(""); // Stato per gestire gli errori

  // Funzione per gestire i cambiamenti degli input
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Funzione per gestire la richiesta di login
  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(""); // Resetta l'errore prima di inviare la richiesta

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signin",
        formData
      );
      // console.log("User logged in:", response.data);
      // Memorizza il token JWT nel localStorage o sessionStorage
      localStorage.setItem("token", response.data.accessToken); // Cambiato da `token` a `accessToken`
      localStorage.setItem("refreshToken", response.data.refreshToken); // Salva anche il refresh token
      navigate("/dashboard"); // Naviga alla Dashboard dopo il successo
    } catch (error) {
      console.error(
        "Errore durante il login:",
        error.response ? error.response.data : error.message
      );
      setError(
        error.response ? error.response.data.message : "Errore di accesso"
      );
    }
  };

  // Funzione per navigare alla pagina di sign-up
  const handleSignUpClick = () => {
    navigate("/sign-up");
  };

  // Funzione di Debug per accedere alla Dashboard
  const handleDebugClick = () => {
    navigate("/dashboard");
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
          Sign in
        </Typography>

        {/* Form */}
        <Box component="form" noValidate onSubmit={handleSignIn}>
          <CustomTextField
            label="Email"
            name="email"
            autoFocus
            onChange={handleInputChange}
          />
          <CustomTextField
            label="Password"
            name="password"
            type="password"
            onChange={handleInputChange}
          />
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
            <CustomButton type="submit">Sign in</CustomButton>
            <CustomButton variant="outlined" onClick={handleDebugClick}>
              Debug: Vai alla Dashboard
            </CustomButton>
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
            Don't have an account?{" "}
            <Link
              variant="body2"
              sx={{ color: theme.colors.primary, cursor: "pointer" }}
              onClick={handleSignUpClick} // Usa handleSignUpClick per navigare
            >
              Sign up
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default SignIn;
