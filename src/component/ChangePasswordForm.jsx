import {
  Alert,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { restrictedPasswords } from "./Config";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../store/UserAuthContext";

export function ChangePasswordForm() {
  const { updateUserPassword, user } = useUserAuth();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Password validation rules

    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const symbolRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
    const numericRegex = /\d/;
    const restrictedSymbolRegex = /[()[\]<>~'"\\{}|.,/\\^|]/;

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (!uppercaseRegex.test(password)) {
      setError("Password must contain at least one uppercase letter");
      return;
    }

    if (!lowercaseRegex.test(password)) {
      setError("Password must contain at least one lowercase letter");
      return;
    }

    if (!symbolRegex.test(password)) {
      setError("Password must contain at least one symbol");
      return;
    }

    if (!numericRegex.test(password)) {
      setError("Password must contain at least one numeric character");
      return;
    }

    if (restrictedSymbolRegex.test(password)) {
      setError(
        `Password contains restricted symbols: ${restrictedSymbolRegex.join(
          ", "
        )}`
      );
      return;
    }

    if (restrictedPasswords.includes(password)) {
      setError("Password is too common or easy to guess");
      return;
    }

    if (password === confirmPassword) {
      //Todo: call password change api

      const updateUserPasswordHandler = async () => {
        try {
          const response = await updateUserPassword(user.userId, password);
          console.log(response);
          setTimeout(() => {
            navigate("/member/cymmetri/login", { replace: true });
          }, 500);
        } catch (error) {
          console.error(error.message);
        }
      };

      setSuccess("Password changed successfully");
      setError("");
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        navigate("/member/cymmetri/login", { replace: true });
      }, 500);
    } else {
      setError("Passwords do not match");
      return;
    }
  };

  const handleAlertDismiss = () => {
    setPassword("");
    setConfirmPassword("");
    setError("");
    setSuccess("");
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
        Password Change
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ m: 1, py: 1, px: 2, width: "80%" }}
      >
        <TextField
          id="password"
          label="New Password"
          type="password"
          fullWidth
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ my: 1 }}
        ></TextField>
        <TextField
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          fullWidth
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={{ my: 1 }}
        />
        <Button type="submit" variant="contained" fullWidth sx={{ my: 1 }}>
          Submit
        </Button>

        {(error || success) && (
          <Stack sx={{ width: "100%", alignItems: "center" }} paddingTop={1}>
            <Alert
              variant={error ? "filled" : "standard"}
              severity={error ? "error" : "success"}
              onClose={handleAlertDismiss}
            >
              {error || success}
            </Alert>
          </Stack>
        )}
      </Box>
    </Box>
  );
}
