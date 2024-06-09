import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";

import image1 from "../assets/otp1.png";
import image2 from "../assets/cymmetri.png";
import { useUserAuth } from "../store/UserAuthContext";

export const SelectAuthentication = () => {
  const { user, generateOTP } = useUserAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSMSAuth = async (e) => {
    e.preventDefault();
    try {
      console.log("username: ", user.username);
      const otp = await generateOTP(user.username);
      console.log("OTP: ", otp);
      navigate("/member/cymmetri/smsAuthentication", { replace: true });
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
      <Typography
        component="h1"
        variant="h5"
        sx={{ mb: 1, textAlign: "center" }}
      >
        Select Your Authentication Access
      </Typography>
      <Card
        onClick={handleSMSAuth}
        sx={{ mb: 1, cursor: "pointer", textAlign: "center" }}
      >
        <CardMedia component="img" image={image1} height={200} />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            SMS Authentication
          </Typography>
        </CardContent>
      </Card>
      <Card
        onClick={handleSMSAuth}
        sx={{ mb: 1, cursor: "pointer", textAlign: "center" }}
      >
        <CardMedia component="img" image={image2} height={200} />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Cymmetri Authentication
          </Typography>
        </CardContent>
      </Card>
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
