import { Grid, TextField, Button, Box, Typography, InputAdornment, IconButton, Dialog, DialogTitle, DialogContent, Link } from '@mui/material';
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import React, { useState, useEffect } from "react";
import { Snackbar, Alert } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthUpdate, useAuth } from "../../Auth";
import { loginImage } from '../image.js';
const Login = () => {
  const setJwtToken = useAuthUpdate();
  const jwtToken = useAuth();
  const [thisState, setThisState] = useState(false);
  //Set hooks for login:
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorLogin, setErrorLogin] = useState("");
  //Set hooks for sign up:
  const [isSignUpDialogOpen, setIsSignUpDialogOpen] = useState(false);
  const [signUpName, setSignUpName] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState("");
  const [errorSignUp, setErrorSignUp] = useState("");
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleSignUpDialog = () => {
    setIsSignUpDialogOpen(!isSignUpDialogOpen);
  };
  //Other vars
  const navigate = useNavigate();

  //Login function
  const signIn = async () => {
    console.log("email:", email);
    console.log("password:", password);
    try {
      const response = await axios.post("http://localhost:5001/verifyUser", {
        email: email,
        password: password,
      });
      console.log(response);
      // localStorage.setItem('jwtToken', response.data.token);  // Only use for if remember me is selected.
      sessionStorage.setItem('jwtToken', response.data.token);
      setJwtToken(response.data.token);
      console.log(jwtToken);
      setErrorLogin("");
      console.log("navigating..")
      navigate("/account");
    } catch (error) {
      setErrorLogin("Email or Password incorrect");
      console.log(error);
    }
  };
  //Signup function
  const signUp = async () => {
    setErrorSignUp(""); // Reset error message

    if (signUpPassword !== signUpConfirmPassword) {
      setErrorSignUp("Password does not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5001/createUser", {
        name: signUpName,
        email: signUpEmail,
        password: signUpPassword,
      });

      if (response.request.status === 201) {
        console.log("responses,", response.request.status);
        setOpenSnackbar(true);
        toggleSignUpDialog()
        setSignUpConfirmPassword("")
        setSignUpEmail("")
        setSignUpPassword("")
        setSignUpName("")
        setErrorSignUp("")
        console.log("Snackbar should now be open");

        setTimeout(() => {
          setOpenSnackbar(false); // Optionally hide alert after some time
        }, 3000);
        setErrorSignUp("Successfully registered");
      } else {
        // Handle non-201 response
        setErrorSignUp("Failed to create account");
      }
    } catch (error) {
      console.log("Error:", error);
      setErrorSignUp(error.response?.data || "An error occurred while creating the account");
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100%',
        backgroundImage: `url(${loginImage})`,
        backgroundSize: 'cover',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 1)',
          padding: 3,
          borderRadius: 2,
          maxWidth: 400
        }}
      >
        <Typography variant="h4" sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold' }}>
          Hackathon
        </Typography>
        <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>
          Welcome
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 2, textAlign: 'center' }}>
          Login
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email Address"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type={showPassword ? 'text' : 'password'}
              label="Password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            {errorLogin && (
              <Typography color="error" sx={{ textAlign: 'center', mb: 2 }}>
                {errorLogin}
              </Typography>
            )}
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
              onClick={signIn}
            >
              SIGN IN
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography textAlign="center" sx={{ mt: 2 }}>
            <Link href="#" onClick={toggleSignUpDialog} sx={{ cursor: 'pointer' }}>
              Sign Up
            </Link>
          </Typography>
        </Grid>
      </Box>
      {/* Sign Up Dialog */}
      <Dialog open={isSignUpDialogOpen} onClose={toggleSignUpDialog}>
        <DialogTitle>Create a new account!</DialogTitle>
        <DialogContent>
          {/* Sign-up form fields */}
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={signUpName}
            onChange={(e) => setSignUpName(e.target.value)}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={signUpEmail}
            onChange={(e) => setSignUpEmail(e.target.value)}
          />
          <TextField
            label="Password"
            fullWidth
            margin="normal"
            type="password"
            value={signUpPassword}
            onChange={(e) => setSignUpPassword(e.target.value)}
          />
          <TextField
            label="Confirm Password"
            fullWidth
            margin="normal"
            type="password"
            value={signUpConfirmPassword}
            onChange={(e) => setSignUpConfirmPassword(e.target.value)}
          />
          <Typography color="error">{errorSignUp}</Typography>
        </DialogContent>
        <Grid container spacing={2} sx={{ p: 2 }}>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              onClick={signUp} // Handle the sign-up logic
            >
              SIGN UP
            </Button>
          </Grid>
        </Grid>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ zIndex: theme => theme.zIndex.tooltip }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          New account created successfully!
        </Alert>
      </Snackbar>
    </Box>


  );
};
export default Login;
