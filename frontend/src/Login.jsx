import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';

// creds: https://github.com/mui/material-ui/blob/v5.10.14/docs/
// data/material/getting-started/templates/sign-in/SignIn.js

/**
 * Copyright Info
 * @param {props} props
 * @return {Object} JSX
 */
function Copyright(props) {
  return (
    <Typography variant="body2"
      color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="localhost:3000">
        Ruchit Patel
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

/**
 * Simple component with no state.
 *
 * @return {object} JSX
 */
function Login() {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('SIGN IN PRESS');
    fetch('http://localhost:3010/v0/login', {
      method: 'POST',
      body: '{"email": "NLUH", "password": "uhh"}',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) throw res;
        return res.json();
      })
      .catch((err) => {
        alert('Error logging in, please try again');
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
                    Login
          </Typography>
          {/* Email password sign in*/}
          <Box component="form" onSubmit={handleSubmit} sx={{mt: 1}}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              type="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/* Sign in Button*/}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{mt: 3, mb: 2}}
            >
                        Sign in
            </Button>
          </Box>
        </Box>
        <Copyright sx={{mt: 8, mb: 4}} />
      </Container>
    </ThemeProvider>
  );
}

export default Login;
