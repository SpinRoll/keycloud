// src/components/modals/EditApartmentModal.js
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle, Box } from "@mui/material";
import { pxToRem } from "../../utils/pxToRem";
import LinkDurationField from "../customComponents/LinkDurationField";
import FixedLinkSwitch from "../customComponents/FixedLinkSwitch";
import DatePickers from "../customComponents/DatePickers";
import GenerateLinkButton from "../customComponents/GenerateLinkButton";
import CopyLinkField from "../customComponents/CopyLinkField";
import ActionButtons from "../customComponents/ActionButtons";
import axios from "axios"; // Importa axios per le richieste HTTP

const EditApartmentModal = ({
  open,
  onClose,
  apartment,
  onLinkGenerated,
  onApartmentUpdated, // Callback per aggiornare l'appartamento
  disabled,
}) => {
  const [localGeneratedLink, setLocalGeneratedLink] = useState("");
  const [selectedCheckInDate, setSelectedCheckInDate] = useState(apartment ? new Date(apartment.data_inizio) : null); // Usa data_inizio
  const [selectedCheckOutDate, setSelectedCheckOutDate] = useState(apartment ? new Date(apartment.data_fine) : null); // Usa data_fine
  const [linkDuration, setLinkDuration] = useState("1 gg");
  const [isFixedLink, setIsFixedLink] = useState(false);

  useEffect(() => {
    if (apartment) {
      setLocalGeneratedLink(apartment.generatedLink || "");
    }
  }, [apartment]);

  const generateRandomLink = () => {
    if (apartment) {
      const newLink = `HTTP://q=IDapt=${apartment.id}`;
      setLocalGeneratedLink(newLink);
      onLinkGenerated(apartment.id, newLink);
    }
  };

  const copyToClipboard = () => {
    if (localGeneratedLink) {
      navigator.clipboard
        .writeText(localGeneratedLink)
        .catch((err) =>
          console.error("Errore durante la copia negli appunti: ", err)
        );
    }
  };

  const calculateLinkDuration = (checkIn, checkOut) => {
    if (checkIn && checkOut) {
      if (checkOut.isBefore(checkIn)) {
        setLinkDuration("Data non valida");
      } else {
        const duration = checkOut.diff(checkIn, "day");
        setLinkDuration(`${duration} gg`);
      }
    }
  };

  useEffect(() => {
    if (!isFixedLink) {
      calculateLinkDuration(selectedCheckInDate, selectedCheckOutDate);
    } else {
      setLinkDuration("∞");
    }
  }, [selectedCheckInDate, selectedCheckOutDate, isFixedLink]);

  const isGenerateButtonDisabled = disabled || localGeneratedLink !== "";

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem("token"); // Recupera il token JWT dal localStorage
      if (!token) {
        console.error("Nessun token trovato. Utente non autenticato.");
        return;
      }

      // Effettua la richiesta al backend per aggiornare l'appartamento
      const response = await axios.put(
        `http://localhost:5000/api/apartments/${apartment._id}`, // Assicurati che il percorso dell'API sia corretto
        {
          data_inizio: selectedCheckInDate,
          data_fine: selectedCheckOutDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Aggiungi il token JWT nell'intestazione
          },
        }
      );

      // Gestisci la risposta dal server
      if (response.status === 200) {
        console.log("Appartamento aggiornato con successo:", response.data);
        onApartmentUpdated(response.data); // Chiamata di callback per aggiornare la lista degli appartamenti
        onClose(); // Chiudi la modale
      }
    } catch (error) {
      console.error(
        "Errore durante l'aggiornamento dell'appartamento:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ fontSize: pxToRem(24), textAlign: "center" }}>
        {apartment ? `Edit ${apartment.nome}` : "Edit Apartment"}
      </DialogTitle>

      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: pxToRem(8),
          width: pxToRem(300),
          padding: pxToRem(16),
        }}>
        {apartment && (
          <>
            <LinkDurationField linkDuration={linkDuration} />
            <FixedLinkSwitch
              isFixedLink={isFixedLink}
              onChange={(e) => setIsFixedLink(e.target.checked)}
            />
            <Box
              sx={{
                display: isFixedLink ? "none" : "flex",
                flexDirection: "column",
                gap: pxToRem(16),
              }}>
              <DatePickers
                checkInDate={selectedCheckInDate}
                setCheckInDate={setSelectedCheckInDate}
                checkOutDate={selectedCheckOutDate}
                setCheckOutDate={setSelectedCheckOutDate}
                isDisabled={isFixedLink}
              />
            </Box>
            <GenerateLinkButton
              onClick={generateRandomLink}
              isDisabled={isGenerateButtonDisabled}
            />
            <CopyLinkField link={localGeneratedLink} onCopy={copyToClipboard} />
            <ActionButtons onSave={handleSaveChanges} onCancel={onClose} /> {/* Usa ActionButtons per salvare o cancellare */}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditApartmentModal;
