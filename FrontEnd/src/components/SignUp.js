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

function SignUp() {
  const theme = useTheme();
  const { toggleTheme, mode } = useContext(ThemeContext);
  const navigate = useNavigate();

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

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        formData
      );
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
          Sign up
        </Typography>

        <Box component="form" noValidate onSubmit={handleSignUp}>
          <CustomTextField
            label="Name"
            name="nome"
            autoFocus
            onChange={handleInputChange}
          />
          <CustomTextField
            label="Surname"
            name="cognome"
            autoFocus
            onChange={handleInputChange}
          />
          <CustomTextField
            label="Email"
            name="email"
            onChange={handleInputChange}
          />
          <CustomTextField
            label="Password"
            name="password"
            type="password"
            onChange={handleInputChange}
          />
          <Box
            sx={{ display: "flex", flexDirection: "column", gap: pxToRem(16) }}>
            <CustomButton sx={{ mt: pxToRem(16) }} type="submit">
              Sign up
            </CustomButton>
          </Box>
          <IconButton onClick={toggleTheme} sx={{ mt: pxToRem(2) }}>
            {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          <Typography
            component="p"
            variant="body2"
            sx={{ color: theme.palette.text.primary }}>
            Already have an account?{" "}
            <Link
              variant="body2"
              sx={{ color: theme.palette.primary.main, cursor: "pointer" }}
              onClick={handleSignInClick}>
              Sign in
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default SignUp;
