import React, { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { RECAPTCHA_SITEKEY } from "./Config";
import { Link, useNavigate } from "react-router-dom";

import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useUserAuth } from "../store/UserAuthContext";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://membersso.bseindia.com/">
        mebersso.bseindia.com 
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

export function LoginPage() {
  const [loginId, setLoginId] = useState("");
  const [captchaValue, setCaptchaValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const { fetchUserByUsername } = useUserAuth();

  const loginFormRef = useRef(null);
  const recaptchaRef = useRef(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!captchaValue) {
      setErrorMessage("Please complete the CAPTCHA. OR Wait for CAPTCHA");
      return;
    }
    try {
      const userData = await fetchUserByUsername(loginId);
      console.log(userData);
      navigate("/member/cymmetri/selectAuthentication", { replace: true });
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleAlertDismiss = () => {
    setLoginId("");
    setErrorMessage("");
    setCaptchaValue("");
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
    }
  };

  return (
    <Grid
      container
      component="main"
      sx={{
        my: 8,
        mx: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        BSE LTD
      </Typography>
      <Box
        component="form"
        ref={loginFormRef}
        onSubmit={handleLogin}
        sx={{ p: 5, width: "100%" }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          label="Login ID"
          type="text"
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
          id="loginId"
          sx={{ my: 2 }}
          autoFocus
        />
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={RECAPTCHA_SITEKEY}
          onChange={(value) => setCaptchaValue(value)}
        />
        <Button
          color="primary"
          spacing={2}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ my: 2 }}
        >
          Submit
        </Button>
      </Box>
      <Box mt={5}>
        <Copyright />
      </Box>

      {errorMessage && (
        <Stack sx={{ width: "100%", alignItems: "center" }} paddingTop={1}>
          <Alert variant="filled" severity="error" onClose={handleAlertDismiss}>
            {errorMessage}
          </Alert>
        </Stack>
      )}
    </Grid>
  );
}
