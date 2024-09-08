// src/components/SignUp.js
import React, { useContext } from "react";
import {
  Container,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Link,
  IconButton,
} from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import Logo from "./logo/Logo";
import CustomTextField from "./customComponents/CustomTextField";
import CustomButton from "./customComponents/CustomButton";
import { useTheme } from "@mui/material/styles";
import { pxToRem } from "../utils/pxToRem";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom"; // Importa useNavigate

function SignUp() {
  const theme = useTheme();
  const { toggleTheme, mode } = useContext(ThemeContext);
  const navigate = useNavigate(); // Usa useNavigate per la navigazione

  // Funzione per navigare alla pagina di sign-in
  const handleSignInClick = () => {
    navigate("/sign-in");
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

        <Box component="form" noValidate>
          <CustomTextField label="Full name" name="fullName" autoFocus />
          <CustomTextField label="Email" name="email" />
          <CustomTextField label="Password" name="password" type="password" />
          <FormControlLabel
            control={<Checkbox value="allowExtraEmails" color="primary" />}
            label="I want to receive updates via email."
            sx={{ color: theme.palette.text.primary }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: pxToRem(16),
            }}>
            <CustomButton type="submit">Sign up</CustomButton>
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
            sx={{ color: theme.palette.text.primary }}>
            Already have an account?{" "}
            <Link
              variant="body2"
              sx={{ color: theme.palette.primary.main, cursor: "pointer" }}
              onClick={handleSignInClick} // Usa handleSignInClick per navigare
            >
              Sign in
            </Link>
          </Typography>

          <Box sx={{ mt: pxToRem(24) }}>
            <CustomButton
              variant="contained"
              sx={{
                backgroundColor: theme.colors.googleButton,
                color: "#FFFFFF",
                marginBottom: pxToRem(16),
              }}>
              Sign up with Google
            </CustomButton>
            <CustomButton
              variant="contained"
              sx={{
                backgroundColor: theme.colors.facebookButton,
                color: "#FFFFFF",
              }}>
              Sign up with Facebook
            </CustomButton>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default SignUp;
