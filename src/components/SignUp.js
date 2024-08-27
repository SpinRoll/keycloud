import React from 'react';
import { Container, Box, TextField, Button, Typography, Checkbox, FormControlLabel, Link } from '@mui/material';

function SignUp({ onSignInClick }) {
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

        {/* Sign Up Title */}
        <Typography component="h2" variant="h6" sx={{ color: '#ffffff', marginTop: '20px' }}>
          Sign up
        </Typography>

        {/* Form */}
        <Box component="form" noValidate sx={{ mt: 1 }}>
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
            InputLabelProps={{ style: { color: '#ffffff' } }}
            InputProps={{ style: { color: '#ffffff' } }}
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
          <FormControlLabel
            control={<Checkbox value="allowExtraEmails" color="primary" />}
            label="I want to receive updates via email."
            sx={{ color: '#ffffff' }}
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
            Sign up
          </Button>

          <Typography component="p" variant="body2" sx={{ color: '#ffffff' }}>
            Already have an account? <Link href="#" variant="body2" sx={{ color: '#ffffff' }} onClick={onSignInClick}>Sign in</Link>
          </Typography>

          <Box sx={{ mt: 3 }}>
            <Button
              variant="contained"
              fullWidth
              sx={{ backgroundColor: '#4285F4', color: '#ffffff', marginBottom: 2 }}
            >
              Sign up with Google
            </Button>
            <Button
              variant="contained"
              fullWidth
              sx={{ backgroundColor: '#3b5998', color: '#ffffff' }}
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
