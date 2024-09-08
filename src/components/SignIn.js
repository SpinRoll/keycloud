// src/components/SignIn.js
import React, { useContext } from "react";
import { Container, Box, Typography, Link, IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import Logo from "./logo/Logo";
import CustomTextField from "./customComponents/CustomTextField";
import CustomButton from "./customComponents/CustomButton";
import { useTheme } from "@mui/material/styles";
import { pxToRem } from "../utils/pxToRem";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
 
function SignIn() {
  const theme = useTheme();
  const { toggleTheme, mode } = useContext(ThemeContext);
  const navigate = useNavigate(); // Usa useNavigate per la navigazione

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
        <Box component="form" noValidate>
          <CustomTextField label="Email" name="email" autoFocus />
          <CustomTextField label="Password" name="password" type="password" />
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
