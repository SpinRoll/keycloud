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
import CustomButton from "../customComponents/CustomButton";
import CustomTextField from "../customComponents/CustomTextField"; // Importa il tuo CustomTextField
import ApartmentDetail from "./ApartmentDetail"; // Importa il componente ApartmentDetail

const apartments = [
  {
    id: 1,
    name: "Appartamento A",
    location: "Roma",
    period: "7gg da 5 lug",
    status: "expired",
  },
  {
    id: 2,
    name: "Appartamento B",
    location: "Milano",
    period: "14 al 18 sett.",
    status: "active",
  },
  {
    id: 3,
    name: "Appartamento C",
    location: "Firenze",
    period: "-",
    status: "inactive",
  },
];

const Apartments = () => {
  const theme = useTheme();
  const [openAdd, setOpenAdd] = useState(false); // Stato per la modale di aggiunta
  const [openEdit, setOpenEdit] = useState(false); // Stato per la modale di modifica
  const [selectedApartment, setSelectedApartment] = useState(null); // Stato per l'appartamento selezionato

  // Funzione per aprire la modale di aggiunta
  const handleClickOpenAdd = () => {
    setSelectedApartment(null);
    setOpenAdd(true);
  };

  // Funzione per aprire la modale di modifica
  const handleClickOpenEdit = (apartment) => {
    setSelectedApartment(apartment);
    setOpenEdit(true);
  };

  // Funzione per chiudere le modali
  const handleClose = () => {
    setOpenAdd(false);
    setOpenEdit(false);
    setSelectedApartment(null);
  };

  // Funzione per ottenere il colore dello stato
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return theme.palette.success.main; // Colore verde
      case "expired":
        return theme.palette.error.main; // Colore rosso
      case "inactive":
        return theme.palette.warning.main; // Colore giallo
      default:
        return theme.palette.text.primary; // Colore testo primario
    }
  };

  return (
    <Container component="main" maxWidth="m" sx={{ position: "relative" }}>
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
              <Box
                sx={{
                  width: pxToRem(40),
                  height: pxToRem(40),
                  backgroundColor: theme.palette.background.default,
                  borderRadius: "50%",
                  marginRight: pxToRem(10),
                }}
              />
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
              <Typography
                variant="body2"
                sx={{
                  color: getStatusColor(apartment.status), // Usa il colore dinamico basato sullo stato
                  fontWeight: "bold",
                  marginRight: pxToRem(10),
                }}>
                {apartment.status.toUpperCase()}
              </Typography>
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  onClick={() => handleClickOpenEdit(apartment)}>
                  <ArrowForwardIosIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Box>
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: pxToRem(30),
          right: pxToRem(30),
        }}
        onClick={handleClickOpenAdd} // Apre la modale per aggiungere un nuovo appartamento
      >
        <AddIcon />
      </Fab>

      {/* Modale per aggiungere un nuovo appartamento */}
      <Dialog open={openAdd} onClose={handleClose}>
        <DialogContent>
          <ApartmentDetail onSave={handleClose} />
        </DialogContent>
      </Dialog>

      {/* Modale per modificare un appartamento esistente */}
      <Dialog open={openEdit} onClose={handleClose}>
        <DialogTitle sx={{ fontSize: pxToRem(24), textAlign: "center" }}>
          Modifica Appartamento
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: pxToRem(16),
            padding: pxToRem(20),
          }}>
          <CustomButton variant="outlined">Test open</CustomButton>
          <CustomTextField
            label="Durata link"
            variant="outlined"
            defaultValue="1 gg"
          />
          <CustomButton variant="contained">-</CustomButton>
          <CustomButton variant="contained">+</CustomButton>
          <FormControlLabel
            control={<Switch color="primary" />}
            label="Link fisso"
          />
          <CustomTextField
            label="Seleziona periodo"
            variant="outlined"
            InputProps={{
              endAdornment: <CalendarTodayIcon />,
            }}
          />
          <CustomButton variant="contained">Generate</CustomButton>
          <Box sx={{ display: "flex", alignItems: "center", gap: pxToRem(10) }}>
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
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default Apartments;
