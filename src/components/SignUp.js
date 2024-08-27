import React from 'react';
import { Container, Box, TextField, Button, Typography, Checkbox, FormControlLabel, Link } from '@mui/material';
import Logo from './Logo';
import { useTheme } from '@mui/material/styles';
import { pxToRem } from '../utils/pxToRem';

function SignUp({ onSignInClick }) {
  const theme = useTheme();

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: theme.colors.backgroundLight,
          padding: `${pxToRem(20)} ${pxToRem(32.38)} ${pxToRem(28)} ${pxToRem(24)}`,
          borderRadius: pxToRem(8),
          boxShadow: `0px ${pxToRem(4)} ${pxToRem(10)} rgba(0, 0, 0, 0.3)`,
        }}
      >
        {/* Logo */}
        <Logo />

        {/* Sign Up Title */}
        <Typography component="h2" variant="h6" sx={{ color: theme.colors.textPrimary, marginTop: pxToRem(20) }}>
          Sign up
        </Typography>

        {/* Form */}
        <Box component="form" noValidate sx={{ mt: pxToRem(16) }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="fullName"
            label="Full name"
            name="fullName"
            autoComplete="name"
            autoFocus
            InputLabelProps={{ style: { color: theme.colors.textPrimary } }}
            InputProps={{
              style: { color: '#FFFFFF', borderColor: theme.colors.textSecondary },
              sx: { backgroundColor: theme.colors.backgroundDark, },
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            InputLabelProps={{ style: { color: theme.colors.textPrimary } }}
            InputProps={{
              style: { color: '#FFFFFF', borderColor: theme.colors.textSecondary },
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
              style: { color: '#FFFFFF', borderColor: theme.colors.textSecondary },
              sx: { backgroundColor: theme.colors.backgroundDark },
            }}
          />
          <FormControlLabel
            control={<Checkbox value="allowExtraEmails" color="primary" />}
            label="I want to receive updates via email."
            sx={{ color: theme.colors.textPrimary }}
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
              '&:hover': {
                backgroundColor: theme.colors.primaryHover,
              },
            }}
          >
            Sign up
          </Button>

          <Typography component="p" variant="body2" sx={{ color: theme.colors.textPrimary }}>
            Already have an account? <Link href="#" variant="body2" sx={{ color: theme.colors.primary }} onClick={onSignInClick}>Sign in</Link>
          </Typography>

          <Box sx={{ mt: pxToRem(24) }}>
            <Button
              variant="contained"
              fullWidth
              sx={{ backgroundColor: theme.colors.googleButton, color: '#FFFFFF', marginBottom: pxToRem(16) }}
            >
              Sign up with Google
            </Button>
            <Button
              variant="contained"
              fullWidth
              sx={{ backgroundColor: theme.colors.facebookButton, color: '#FFFFFF' }}
            >
              Sign up with Facebook
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default SignUp;
