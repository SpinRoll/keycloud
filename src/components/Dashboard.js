// src/components/Dashboard.js
import React from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import { pxToRem } from "../utils/pxToRem";

const Dashboard = ({ onViewApartmentsClick }) => {
  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: pxToRem(32),
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: pxToRem(20),
          borderRadius: pxToRem(8),
          boxShadow: `0px ${pxToRem(4)} ${pxToRem(10)} rgba(0, 0, 0, 0.3)`,
        }}>
        <Typography
          component="h1"
          variant="h4"
          sx={{ marginBottom: pxToRem(24) }}>
          Dashboard
        </Typography>
        <Button
          variant="contained"
          onClick={onViewApartmentsClick}
          sx={{
            backgroundColor: "#3B82F6",
            color: "#FFFFFF",
            marginBottom: pxToRem(16),
            "&:hover": { backgroundColor: "#2563EB" },
          }}>
          Appartamenti
        </Button>
      </Box>
    </Container>
  );
};

export default Dashboard;
