// src/components/modals/EditApartmentModal.js
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  IconButton,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { pxToRem } from "../../utils/pxToRem";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomButton from "../customComponents/CustomButton";
import CustomTextField from "../customComponents/CustomTextField";
import { useTheme } from "@mui/material/styles"; // Assicura di utilizzare il tema

const EditApartmentModal = ({ open, onClose, apartment }) => {
  const theme = useTheme(); // Usa il tema corrente

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ fontSize: pxToRem(24), textAlign: "center" }}>
        Modifica Appartamento
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: pxToRem(16),
          width: pxToRem(300),
          padding: pxToRem(20),
        }}>
        {apartment && (
          <>
            <CustomTextField
              label="Durata link"
              variant="outlined"
              defaultValue="1 gg"
            />
            <Box sx={{ display: "flex", gap: pxToRem(10) }}>
              <CustomButton variant="contained">-</CustomButton>
              <CustomButton variant="contained">+</CustomButton>
            </Box>
            <FormControlLabel
              control={<Switch color="primary" />}
              label="Link fisso"
            />
            <CustomTextField
              label="Seleziona periodo"
              variant="outlined"
              InputProps={{ endAdornment: <CalendarTodayIcon /> }}
            />
            <CustomButton variant="contained">Generate</CustomButton>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: pxToRem(10) }}>
              <CustomTextField
                variant="outlined"
                defaultValue="HTTP://bitfly.es/45ggdfy"
              />
              <IconButton>
                <ContentCopyIcon />
              </IconButton>
            </Box>
            <CustomButton variant="contained" color="primary">
              Salva
            </CustomButton>
            <CustomButton variant="outlined" color="primary">
              Edit
            </CustomButton>
            <CustomButton
              variant="outlined"
              sx={{
                color: theme.colors.red,
                borderColor: theme.colors.red,
                "&:hover": {
                  backgroundColor: theme.colors.lightRed,
                  borderColor: theme.colors.lightRed,
                  color: theme.colors.red,
                },
              }}
              startIcon={<DeleteIcon />}>
              DELETE APARTMENT
            </CustomButton>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditApartmentModal;
