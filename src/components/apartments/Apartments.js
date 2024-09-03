// src/components/Apartments.js
import React, { useState } from "react";
import {
  Container,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
  IconButton,
  Fab,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { pxToRem } from "../../utils/pxToRem";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useTheme } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CustomButton from "../customComponents/CustomButton"; // Importa il tuo CustomButton

// Lista degli appartamenti con lo stato e il periodo
const apartments = [
  {
    id: 1,
    name: "Appartamento A",
    location: "Roma",
    period: "7gg da 5 lug", // Periodo per expired
    status: "expired",
  },
  {
    id: 2,
    name: "Appartamento B",
    location: "Milano",
    period: "14 al 18 sett.", // Periodo per active
    status: "active",
  },
  {
    id: 3,
    name: "Appartamento C",
    location: "Firenze",
    period: "-", // Periodo per inactive
    status: "inactive",
  },
];

const Apartments = ({ onViewApartmentDetail }) => {
  const theme = useTheme(); // Usa il tema corrente
  const [open, setOpen] = useState(false); // Stato per la modale

  // Funzione per aprire la modale
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Funzione per chiudere la modale
  const handleClose = () => {
    setOpen(false);
  };

  // Funzione per ottenere il colore dello stato
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return theme.palette.success.main; // Colore verde
      case "expired":
        return theme.palette.error.main; // Colore rosso
      case "inactive":
        return theme.palette.warning.main; // Colore arancione
      default:
        return theme.palette.text.primary; // Colore testo primario
    }
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ position: "relative" }}>
      <Box
        sx={{
          marginTop: pxToRem(32),
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: pxToRem(20),
          borderRadius: pxToRem(8),
          boxShadow: `0px ${pxToRem(0)} ${pxToRem(10)} #635FC7`,
        }}>
        <Typography
          component="h1"
          variant="h4"
          sx={{ marginBottom: pxToRem(24) }}>
          Appartamenti
        </Typography>
        <List sx={{ width: "100%" }}>
          {apartments.map((apartment) => (
            <ListItem
              key={apartment.id}
              sx={{
                borderBottom: `1px solid ${theme.palette.divider}`,
                display: "flex",
                alignItems: "center",
              }}>
              {/* Icona per l'appartamento */}
              <Box
                sx={{
                  width: pxToRem(40),
                  height: pxToRem(40),
                  backgroundColor: theme.palette.background.default,
                  borderRadius: "50%",
                  marginRight: pxToRem(10),
                }}
              />
              {/* Testo dell'appartamento */}
              <ListItemText
                primary={<Typography variant="h6">{apartment.name}</Typography>}
                secondary={
                  <Typography
                    variant="body2"
                    sx={{ color: theme.palette.text.secondary }}>
                    Periodo: {apartment.period}
                  </Typography>
                }
              />
              {/* Stato dell'appartamento */}
              <Typography
                variant="body2"
                sx={{
                  color: getStatusColor(apartment.status),
                  fontWeight: "bold",
                  marginRight: pxToRem(10),
                }}>
                {apartment.status.toUpperCase()}
              </Typography>
              {/* Icona per i dettagli */}
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  onClick={() => onViewApartmentDetail(apartment)}>
                  <ArrowForwardIosIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Box>
      {/* Pulsante + per aggiungere nuovi appartamenti */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: pxToRem(30),
          right: pxToRem(30),
        }}
        onClick={handleClickOpen} // Apre la modale
      >
        <AddIcon />
      </Fab>

      {/* Modale per l'aggiunta di un nuovo appartamento */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ fontSize: pxToRem(24), textAlign: "center" }}>
          Aggiungi Appartamento
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: pxToRem(16),
            padding: pxToRem(20),
          }}>
          {/* Input per nome appartamento */}
          <CustomButton variant="outlined">Test open</CustomButton>
          <TextField
            label="Durata link"
            variant="outlined"
            defaultValue="1 gg"
          />
          <CustomButton variant="contained">-</CustomButton>
          <CustomButton variant="contained">+</CustomButton>
          {/* Switch per il link fisso */}
          <FormControlLabel
            control={<Switch color="primary" />}
            label="Link fisso"
          />
          {/* Selettore di periodo */}
          <TextField
            label="Seleziona periodo"
            variant="outlined"
            InputProps={{
              endAdornment: <CalendarTodayIcon />,
            }}
          />
          {/* Generazione di link */}
          <CustomButton variant="contained">Generate</CustomButton>
          <Box sx={{ display: "flex", alignItems: "center", gap: pxToRem(10) }}>
            <TextField
              variant="outlined"
              defaultValue="HTTP://bitfly.es/45ggdfy"
            />
            <IconButton>
              <ContentCopyIcon />
            </IconButton>
          </Box>
          {/* Azioni della modale */}
          <CustomButton variant="contained" color="primary">
            Salva
          </CustomButton>
          <CustomButton variant="outlined" color="primary">
            Edit
          </CustomButton>
          <CustomButton
            variant="outlined"
            color="error"
            sx={{ color: theme.colors.red }}
            startIcon={<DeleteIcon />}>
            DELETE APARTMENT
          </CustomButton>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default Apartments;
