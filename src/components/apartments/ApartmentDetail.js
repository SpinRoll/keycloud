// src/components/ApartmentDetail.js
import React from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import { pxToRem } from "../../utils/pxToRem";

const ApartmentDetail = ({ apartment }) => {
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
          {apartment.name}
        </Typography>
        <Typography variant="h6">Location: {apartment.location}</Typography>
        <Typography variant="h6">Prezzo: €{apartment.price} / mese</Typography>
        <Typography variant="body1" sx={{ marginTop: pxToRem(16) }}>
          {apartment.description}
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: pxToRem(24) }}
          onClick={() => window.history.back()} // Torna indietro alla lista
        >
          Torna alla Lista
        </Button>
      </Box>
    </Container>
  );
};

export default ApartmentDetail;
