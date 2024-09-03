// src/components/modals/AddApartmentModal.js
import React from "react";
import { Dialog, DialogContent, DialogTitle, Box } from "@mui/material";
import { pxToRem } from "../../utils/pxToRem";
import CustomButton from "../customComponents/CustomButton";
import CustomTextField from "../customComponents/CustomTextField";
import HomeIcon from "@mui/icons-material/Home"; // Importa un'icona per rappresentare l'appartamento

const AddApartmentModal = ({ open, onClose }) => {
  return (
    <Dialog maxWidth="m" open={open} onClose={onClose}>
      <DialogTitle sx={{ fontSize: pxToRem(24), textAlign: "center" }}>
        Aggiungi Appartamento
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: pxToRem(16),
          width: pxToRem(300),
          padding: pxToRem(20),
        }}>
        {/* Icona e Titolo */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginBottom: pxToRem(16),
          }}>
          <HomeIcon sx={{ fontSize: pxToRem(60) }} />
        </Box>
        {/* Form per aggiungere i dettagli dell'appartamento */}
        <CustomTextField label="Nome" variant="outlined" fullWidth />
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
          onClick={onClose} // Chiudi la modale quando si salva
          sx={{ mt: pxToRem(24) }}>
          Salva
        </CustomButton>
      </DialogContent>
    </Dialog>
  );
};

export default AddApartmentModal;
