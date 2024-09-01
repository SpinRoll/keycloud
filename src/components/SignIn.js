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

function SignIn({ onSignUpClick, onDebugClick }) {
  const theme = useTheme();
  const { toggleTheme, mode } = useContext(ThemeContext);

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
            marginTop: pxToRem(20),
            textAlign: "center",
          }}>
          Sign in
        </Typography>

        {/* Form */}
        <Box component="form" noValidate sx={{ mt: pxToRem(16) }}>
          <CustomTextField label="Email" name="email" autoFocus />
          <CustomTextField label="Password" name="password" type="password" />
          <CustomButton type="submit">Sign in</CustomButton>

          <CustomButton variant="outlined" onClick={onDebugClick}>
            Debug: Vai alla Dashboard
          </CustomButton>

          <IconButton onClick={toggleTheme} sx={{ mt: pxToRem(2) }}>
            {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>

          <Typography
            component="p"
            variant="body2"
            sx={{
              color: theme.palette.text.primary,
              mt: pxToRem(16),
              textAlign: "center",
            }}>
            Don't have an account?{" "}
            <Link
              href="#"
              variant="body2"
              sx={{ color: theme.colors.primary }}
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
