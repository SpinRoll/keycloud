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

function SignUp({ onSignInClick, onDebugClick }) {
  const theme = useTheme();
  const { toggleTheme, mode } = useContext(ThemeContext);

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
          sx={{ color: theme.palette.text.primary, marginTop: pxToRem(20) }}>
          Sign up
        </Typography>

        <Box component="form" noValidate sx={{ mt: pxToRem(16) }}>
          <CustomTextField label="Full name" name="fullName" autoFocus />
          <CustomTextField label="Email" name="email" />
          <CustomTextField label="Password" name="password" type="password" />
          <FormControlLabel
            control={<Checkbox value="allowExtraEmails" color="primary" />}
            label="I want to receive updates via email."
            sx={{ color: theme.palette.text.primary }}
          />
          <CustomButton type="submit">Sign up</CustomButton>
          <CustomButton variant="outlined" onClick={onDebugClick}>
            Debug: Vai alla Dashboard
          </CustomButton>
          <IconButton onClick={toggleTheme} sx={{ mt: pxToRem(2) }}>
            {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          <Typography
            component="p"
            variant="body2"
            sx={{ color: theme.palette.text.primary }}>
            Already have an account?{" "}
            <Link
              href="#"
              variant="body2"
              sx={{ color: theme.palette.primary.main }}
              onClick={onSignInClick}>
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
