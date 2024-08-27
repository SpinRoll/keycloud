import React from 'react';
import { Container, Box, TextField, Button, Typography, Link } from '@mui/material';

function SignIn({ onSignUpClick }) {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#1c1c1c',
          padding: '20px',
          borderRadius: '8px',
        }}
      >
        {/* Logo */}
        <Typography component="h1" variant="h5" sx={{ color: '#ffffff' }}>
          Sitemark
        </Typography>

        {/* Sign In Title */}
        <Typography component="h2" variant="h6" sx={{ color: '#ffffff', marginTop: '20px' }}>
          Sign in
        </Typography>

        {/* Form */}
        <Box component="form" noValidate sx={{ mt: 1 }}>
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
            InputLabelProps={{ style: { color: '#ffffff' } }}
            InputProps={{ style: { color: '#ffffff' } }}
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
            InputLabelProps={{ style: { color: '#ffffff' } }}
            InputProps={{ style: { color: '#ffffff' } }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: '#ffffff',
              color: '#1c1c1c',
              '&:hover': {
                backgroundColor: '#e0e0e0',
              },
            }}
          >
            Sign in
          </Button>

          <Typography component="p" variant="body2" sx={{ color: '#ffffff' }}>
            Don't have an account? <Link href="#" variant="body2" sx={{ color: '#ffffff' }} onClick={onSignUpClick}>Sign up</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default SignIn;
