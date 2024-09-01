import React from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Link,
} from "@mui/material";
import Logo from "./Logo";
import { useTheme } from "@mui/material/styles";
import { pxToRem } from "../utils/pxToRem";

function SignIn({ onSignUpClick }) {
  const theme = useTheme();

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: theme.colors.backgroundLight,
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
          sx={{ color: theme.colors.textPrimary, marginTop: pxToRem(20) }}>
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
            InputLabelProps={{ style: { color: theme.colors.textPrimary } }}
            InputProps={{
              style: {
                color: "#FFFFFF",
                borderColor: theme.colors.textSecondary,
              },
              sx: { backgroundColor: theme.colors.backgroundDark },
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
            InputLabelProps={{ style: { color: theme.colors.textPrimary } }}
            InputProps={{
              style: {
                color: "#FFFFFF",
                borderColor: theme.colors.textSecondary,
              },
              sx: { backgroundColor: theme.colors.backgroundDark },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: pxToRem(24),
              mb: pxToRem(16),
              backgroundColor: theme.colors.primary,
              color: theme.colors.textOnPrimary,
              "&:hover": {
                backgroundColor: theme.colors.primaryHover,
              },
            }}>
            Sign in
          </Button>

          <Typography
            component="p"
            variant="body2"
            sx={{ color: theme.colors.textPrimary }}>
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
