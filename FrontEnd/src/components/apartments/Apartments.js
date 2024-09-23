// src/components/apartments/Apartments.js
import React, { useState, useEffect } from "react";
import axios from "axios";
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
import dayjs from "dayjs"; // Importa dayjs per la gestione delle date

const Apartments = () => {
  const theme = useTheme(); // Uso il tema corrente di Material-UI per ottenere i colori
  const { t } = useTranslation(); // Uso il hook useTranslation per ottenere la funzione di traduzione
  const [apartments, setApartments] = useState([]); // Stato per la lista degli appartamenti
  const [openAdd, setOpenAdd] = useState(false); // Stato per gestire l'apertura della modale di aggiunta
  const [openEdit, setOpenEdit] = useState(false); // Stato per gestire l'apertura della modale di modifica
  const [selectedApartment, setSelectedApartment] = useState(null); // Stato per l'appartamento selezionato da modificare

  // Funzione per ottenere gli appartamenti dell'utente autenticato
  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const token = localStorage.getItem("token"); // Assicurati che il token JWT sia presente in localStorage

        if (!token) {
          console.error("Token non trovato! Effettua il login.");
          return;
        }

        const response = await axios.get(
          "http://localhost:5000/api/apartments",
          {
            // Assicurati che il percorso dell'API sia corretto
            headers: {
              Authorization: `Bearer ${token}`, // Aggiungi il token JWT nell'intestazione
            },
          }
        );

        const updatedApartments = response.data.map((apartment) => {
          const { status, color } = getApartmentStatusAndColor(apartment);
          return {
            ...apartment,
            status,
            color,
          };
        });

        setApartments(updatedApartments); // Imposta la lista degli appartamenti
      } catch (error) {
        console.error(
          "Errore nel recupero degli appartamenti:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchApartments();
    // eslint-disable-next-line
  }, []);

  // Funzione per determinare lo stato e il colore dell'appartamento
  const getApartmentStatusAndColor = (apartment) => {
    const today = dayjs(); // Data di oggi
    // eslint-disable-next-line
    const dataInizio = dayjs(apartment.data_inizio);
    const dataFine = dayjs(apartment.data_fine);
    let status = "inactive"; // Stato predefinito

    if (!apartment.data_inizio || !apartment.data_fine) {
      status = "inactive"; // Se non ci sono date, lo stato è "inactive"
    } else if (dataFine.isBefore(today)) {
      status = "expired"; // Se la data di fine è minore di oggi, è "expired"
    } else {
      status = "active"; // Altrimenti è "active"
    }

    const colors = {
      active: theme.palette.success.main,
      expired: theme.palette.error.main,
      inactive: theme.palette.warning.main,
    };

    const color = colors[status] || theme.palette.text.primary; // Colore corrispondente allo stato

    return { status, color };
  };

  // Funzione per gestire la generazione del link di un appartamento
  const handleLinkGenerated = (apartmentId, newLink) => {
    setApartments((prevApartments) =>
      prevApartments.map((apartment) =>
        apartment._id === apartmentId
          ? { ...apartment, generatedLink: newLink }
          : apartment
      )
    );
  };

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
    newApartment.status = "inactive"; // Stato predefinito per un nuovo appartamento
    setApartments((prevApartments) => [...prevApartments, newApartment]); // Aggiungi il nuovo appartamento alla lista esistente
    handleClose(); // Chiudi la modale dopo aver aggiunto l'appartamento
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

        {/* Controllo se ci sono appartamenti disponibili */}
        {apartments.length === 0 ? (
          <Typography
            variant="body1"
            sx={{
              marginTop: pxToRem(16),
              color: theme.palette.text.secondary,
            }}>
            {t("no_apartments_message")}{" "}
            {/* Messaggio che informa l'utente che non ci sono appartamenti */}
          </Typography>
        ) : (
          <List sx={{ width: "100%" }}>
            {apartments.map((apartment) => (
              <ListItem
                key={apartment._id}
                button
                onClick={() => handleOpenModal("edit", apartment)} // Apre la modale di modifica per l'appartamento selezionato
                sx={{
                  borderBottom: `1px solid ${theme.palette.divider}`,
                  display: "flex",
                  alignItems: "center",
                }}>
                {/* Mostra il nome e il periodo dell'appartamento */}
                <ListItemText
                  primary={
                    <Typography variant="h6">{apartment.nome}</Typography>
                  }
                  secondary={
                    <Typography
                      variant="body2"
                      sx={{ color: theme.palette.text.secondary }}>
                      Periodo:{" "}
                      {`${
                        apartment.data_inizio
                          ? new Date(apartment.data_inizio).toLocaleDateString()
                          : "N/A"
                      } - ${
                        apartment.data_fine
                          ? new Date(apartment.data_fine).toLocaleDateString()
                          : "N/A"
                      }`}
                    </Typography>
                  }
                />
                {/* Mostra lo stato dell'appartamento con il colore corrispondente */}
                <Typography
                  variant="body2"
                  sx={{
                    color: apartment.color,
                    fontWeight: "bold",
                    marginRight: pxToRem(10),
                  }}>
                  {apartment.status
                    ? apartment.status.toUpperCase()
                    : "Inactive"}
                </Typography>
                <ListItemSecondaryAction>
                  <IconButton>
                    <ArrowForwardIosIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}
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
        onLinkGenerated={handleLinkGenerated}
        onApartmentUpdated={(updatedApartment) => {
          setApartments((prevApartments) =>
            prevApartments.map((apartment) =>
              apartment._id === updatedApartment._id
                ? updatedApartment
                : apartment
            )
          );
        }} // Callback per aggiornare l'appartamento
      />
    </Container>
  );
};

export default Apartments;
