// src/components/apartments/Apartments.js
import React, { useState } from "react";
import {
  Container,
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
  Fab,
  ListItemSecondaryAction,
} from "@mui/material";
import { pxToRem } from "../../utils/pxToRem";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useTheme } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import EditApartmentModal from "../modals/EditApartmentModal"; // Importa il componente modale
import AddApartmentModal from "../modals/AddApartmentModal"; // Importa il componente modale
import { useTranslation } from "react-i18next";

// Dichiaro un array di oggetti per rappresentare gli appartamenti con alcuni dati di esempio
const initialApartments = [
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
  const theme = useTheme(); // Uso il tema corrente di Material-UI per ottenere i colori
  const { t } = useTranslation(); // Uso il hook useTranslation per ottenere la funzione di traduzione
  const [apartments, setApartments] = useState(initialApartments); // Stato per la lista degli appartamenti
  const [openAdd, setOpenAdd] = useState(false); // Stato per gestire l'apertura della modale di aggiunta
  const [openEdit, setOpenEdit] = useState(false); // Stato per gestire l'apertura della modale di modifica
  const [selectedApartment, setSelectedApartment] = useState(null); // Stato per l'appartamento selezionato da modificare

  // Funzione per aprire le modali di aggiunta o modifica
  const handleOpenModal = (type, apartment = null) => {
    setSelectedApartment(apartment); // Imposta l'appartamento selezionato per la modifica
    type === "add" ? setOpenAdd(true) : setOpenEdit(true); // Apri la modale corrispondente
  };

  // Funzione per chiudere le modali
  const handleClose = () => {
    setOpenAdd(false); // Chiude la modale di aggiunta
    setOpenEdit(false); // Chiude la modale di modifica
    setSelectedApartment(null); // Reset dell'appartamento selezionato
  };

  // Funzione per aggiungere un nuovo appartamento alla lista
  const handleAddApartment = (newApartment) => {
    setApartments((prevApartments) => [...prevApartments, newApartment]); // Aggiungi il nuovo appartamento alla lista esistente
    handleClose(); // Chiudi la modale dopo aver aggiunto l'appartamento
  };

  // Funzione per ottenere il colore dello stato dell'appartamento in base al tema
  const getStatusColor = (status) => {
    const colors = {
      active: theme.palette.success.main,
      expired: theme.palette.error.main,
      inactive: theme.palette.warning.main,
    };
    return colors[status] || theme.palette.text.primary; // Restituisco il colore corrispondente o il colore di testo di default
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
          {t("apartments")}
        </Typography>
        <List sx={{ width: "100%" }}>
          {apartments.map((apartment) => (
            <ListItem
              key={apartment.id}
              button
              onClick={() => handleOpenModal("edit", apartment)} // Apre la modale di modifica per l'appartamento selezionato
              sx={{
                borderBottom: `1px solid ${theme.palette.divider}`,
                display: "flex",
                alignItems: "center",
              }}>
              {/* Mostra il nome e il periodo dell'appartamento */}
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
              {/* Mostra lo stato dell'appartamento con il colore corrispondente */}
              <Typography
                variant="body2"
                sx={{
                  color: getStatusColor(apartment.status),
                  fontWeight: "bold",
                  marginRight: pxToRem(10),
                }}>
                {apartment.status.toUpperCase()}
              </Typography>
              <ListItemSecondaryAction>
                <IconButton>
                  <ArrowForwardIosIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Box>
      {/* Pulsante per aggiungere un nuovo appartamento */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: pxToRem(30),
          right: pxToRem(30),
        }}
        onClick={() => handleOpenModal("add")}>
        <AddIcon />
      </Fab>

      {/* Modale per aggiungere un nuovo appartamento */}
      <AddApartmentModal
        open={openAdd}
        onClose={handleClose}
        onAddApartment={handleAddApartment}
      />

      {/* Modale per modificare un appartamento esistente */}
      <EditApartmentModal
        open={openEdit}
        onClose={handleClose}
        apartment={selectedApartment}
      />
    </Container>
  );
};

export default Apartments;
