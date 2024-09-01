// src/components/SignIn.js
import React, { useContext } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Link,
  IconButton,
} from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material"; // Importa le icone per la commutazione del tema
import Logo from "./Logo";
import { useTheme } from "@mui/material/styles";
import { pxToRem } from "../utils/pxToRem";
import { ThemeContext } from "../context/ThemeContext"; // Importa il contesto del tema

function SignIn({ onSignUpClick, onDebugClick }) {
  const theme = useTheme();
  const { toggleTheme, mode } = useContext(ThemeContext); // Usa il contesto del tema

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: theme.palette.background.paper,
          padding: `${pxToRem(20)} ${pxToRem(32.38)} ${pxToRem(28)} ${pxToRem(
            24
          )}`,
          borderRadius: pxToRem(8),
          boxShadow: `0px ${pxToRem(4)} ${pxToRem(10)} rgba(0, 0, 0, 0.3)`,
        }}>
        {/* Logo */}
        <Logo />

        {/* Sign In Title */}
        <Typography
          component="h2"
          variant="h6"
          sx={{ color: theme.palette.text.primary, marginTop: pxToRem(20) }}>
          Sign in
        </Typography>

        {/* Form */}
        <Box component="form" noValidate sx={{ mt: pxToRem(16) }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            InputLabelProps={{ style: { color: theme.palette.text.primary } }}
            InputProps={{
              style: {
                color: theme.palette.text.primary,
                borderColor: theme.palette.text.secondary,
              },
              sx: { backgroundColor: theme.palette.background.default },
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            InputLabelProps={{ style: { color: theme.palette.text.primary } }}
            InputProps={{
              style: {
                color: theme.palette.text.primary,
                borderColor: theme.palette.text.secondary,
              },
              sx: { backgroundColor: theme.palette.background.default },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: pxToRem(24),
              mb: pxToRem(16),
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.textOnPrimary,
              "&:hover": {
                backgroundColor: theme.colors.primaryHover,
              },
            }}>
            Sign in
          </Button>

          {/* Pulsante Debug */}
          <Button
            type="button"
            fullWidth
            variant="outlined"
            onClick={onDebugClick} // Utilizza la funzione di callback onDebugClick
            sx={{ mt: pxToRem(2), color: theme.palette.primary.main }}>
            Debug: Vai alla Dashboard
          </Button>

          {/* Pulsante di commutazione del tema */}
          <IconButton onClick={toggleTheme} sx={{ mt: pxToRem(2) }}>
            {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>

          <Typography
            component="p"
            variant="body2"
            sx={{ color: theme.palette.text.primary }}>
            Don't have an account?{" "}
            <Link
              href="#"
              variant="body2"
              sx={{ color: theme.palette.primary.main }}
              onClick={onSignUpClick}>
              Sign up
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default SignIn;
