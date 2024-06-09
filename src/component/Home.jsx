import React from "react";
import { Outlet } from "react-router-dom";
import { CssBaseline, Grid, Paper } from "@mui/material";
import backgroundImage from "../assets/CymmetriFP.png";

export const Home = () => {
  return (
    <Grid container component="main" style={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={12}
        sm={4}
        md={7}
        sx={{
          display: { xs: "none", sm: "block" },
        }}
      >
        <img
          src={backgroundImage}
          alt="Background Image"
          style={{ height: "100%", width: "100%", objectFit: "cover" }}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Outlet />
      </Grid>
    </Grid>
  );
};
