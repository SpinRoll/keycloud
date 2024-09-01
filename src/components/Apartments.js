// src/components/Apartments.js
import React from "react";
import {
  Container,
  Box,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { pxToRem } from "../utils/pxToRem";

const apartments = [
  {
    id: 1,
    name: "Appartamento A",
    location: "Roma",
    price: 1200,
    description: "Appartamento luminoso con due camere e una cucina.",
  },
  {
    id: 2,
    name: "Appartamento B",
    location: "Milano",
    price: 1500,
    description: "Appartamento spazioso con tre camere e balcone.",
  },
  {
    id: 3,
    name: "Appartamento C",
    location: "Firenze",
    price: 1000,
    description: "Appartamento accogliente vicino al centro città.",
  },
];

const Apartments = ({ onViewApartmentDetail }) => {
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
          Lista degli Appartamenti
        </Typography>
        {apartments.map((apartment) => (
          <Card
            key={apartment.id}
            sx={{ width: "100%", marginBottom: pxToRem(16) }}>
            <CardContent>
              <Typography variant="h5">{apartment.name}</Typography>
              <Typography variant="body1">{apartment.location}</Typography>
              <Typography variant="body2" sx={{ marginBottom: pxToRem(8) }}>
                {apartment.description}
              </Typography>
              <Button
                variant="outlined"
                onClick={() => onViewApartmentDetail(apartment)}>
                Visualizza Dettagli
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default Apartments;
