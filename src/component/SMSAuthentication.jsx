import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useUserAuth } from "../store/UserAuthContext";

export const SMSAuthentication = () => {
  const { validateOTP, user } = useUserAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (otpValue) => {
    setOtp(otpValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const otpValidationResponse = await validateOTP(user.username, otp);
      console.log(otpValidationResponse);
      setTimeout(() => {
        navigate("/member/cymmetri/changePassword", { replace: true });
      }, 1000);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleAlertDismiss = () => {
    setErrorMessage("");
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5">
        Enter SMS OTP
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ m: 1, py: 1, px: 2, width: "80%" }}
      >
        <MuiOtpInput
          sx={{ mt: 1 }}
          value={otp}
          length={6}
          onChange={handleChange}
          TextFieldsProps={{
            inputProps: {
              sx: {
                color: "blue",
                border: "1px solid red",
                borderRadius: "5px",
                padding: isMobile ? "8px" : "12px",
              },
            },
          }}
        />

        <Button
          sx={{ mt: 1 }}
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          size="large"
        >
          Submit
        </Button>
      </Box>
      {errorMessage && (
        <Stack sx={{ width: "100%", alignItems: "center" }} paddingTop={1}>
          <Alert variant="filled" severity="error" onClose={handleAlertDismiss}>
            {errorMessage}
          </Alert>
        </Stack>
      )}
    </Box>
  );
};
