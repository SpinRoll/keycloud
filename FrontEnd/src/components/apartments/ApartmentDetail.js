// src/components/apartments/ApartmentDetail.js
import React from "react";
import { Container, Box, Typography } from "@mui/material";
import { pxToRem } from "../../utils/pxToRem";
import CustomButton from "../customComponents/CustomButton";
import CustomTextField from "../customComponents/CustomTextField"; // Importa il tuo CustomTextField
import HomeIcon from "@mui/icons-material/Home"; // Importa un'icona per rappresentare l'appartamento

const ApartmentDetail = ({ onSave }) => {
  return (
    <Container component="main" maxWidth="xs">
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
        {/* Icona e Titolo */}
        <HomeIcon sx={{ fontSize: pxToRem(60), marginBottom: pxToRem(16) }} />
        <Typography
          component="h1"
          variant="h5"
          sx={{ marginBottom: pxToRem(24) }}>
          Aggiungi Appartamento
        </Typography>

        {/* Form per aggiungere i dettagli dell'appartamento */}
        <CustomTextField
          label="Nome"
          variant="outlined"
          fullWidth
          sx={{ mb: pxToRem(16) }}
        />
        <Box sx={{ display: "flex", gap: pxToRem(16), width: "100%" }}>
          <CustomTextField label="Via" variant="outlined" fullWidth />
          <CustomTextField label="N*" variant="outlined" fullWidth />
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: pxToRem(16),
            width: "100%",
            mt: pxToRem(16),
          }}>
          <CustomTextField label="Città" variant="outlined" fullWidth />
          <CustomTextField label="Piano/scala" variant="outlined" fullWidth />
        </Box>
        <CustomTextField
          label="Codice postale"
          variant="outlined"
          fullWidth
          sx={{ mt: pxToRem(16) }}
        />
        <Box
          sx={{
            display: "flex",
            gap: pxToRem(16),
            width: "100%",
            mt: pxToRem(16),
          }}>
          <CustomTextField label="Pref" variant="outlined" fullWidth />
          <CustomTextField label="Telefono" variant="outlined" fullWidth />
        </Box>

        {/* Bottone Salva */}
        <CustomButton
          variant="contained"
          onClick={onSave}
          sx={{ mt: pxToRem(24) }}>
          Salva
        </CustomButton>
      </Box>
    </Container>
  );
};

export default ApartmentDetail;
