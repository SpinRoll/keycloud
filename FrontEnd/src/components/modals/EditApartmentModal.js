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
import dayjs from "dayjs"; // Importa dayjs per gestire il formato delle date

const EditApartmentModal = ({
  open,
  onClose,
  apartment,
  onLinkGenerated,
  onApartmentUpdated,
  disabled,
}) => {
  const [localGeneratedLink, setLocalGeneratedLink] = useState("");
  const [selectedCheckInDate, setSelectedCheckInDate] = useState(
    apartment ? dayjs(apartment.data_inizio) : null
  ); // Usa dayjs per formattare
  const [selectedCheckOutDate, setSelectedCheckOutDate] = useState(
    apartment ? dayjs(apartment.data_fine) : null
  ); // Usa dayjs per formattare
  const [linkDuration, setLinkDuration] = useState("1 gg");
  const [isFixedLink, setIsFixedLink] = useState(false);

  useEffect(() => {
    if (apartment) {
      setLocalGeneratedLink(apartment.generatedLink || "");
      setSelectedCheckInDate(
        apartment.data_inizio ? dayjs(apartment.data_inizio) : null
      );
      setSelectedCheckOutDate(
        apartment.data_fine ? dayjs(apartment.data_fine) : null
      );
    }
  }, [apartment]);

  const generateRandomLink = async () => {
    if (apartment) {
      try {
        const apiUrl = `https://key-tick-nice.ngrok-free.app/generate?IDapt=${apartment._id}`;
        console.log("API URL:", apiUrl); // Verifica l'URL chiamato

        const response = await axios.get(apiUrl, {
          headers: {
            "Ngrok-Skip-Browser-Warning": "true", // Bypassare il warning di Ngrok
          },
        });

        // Verifica che la risposta contenga il JSON atteso
        console.log("Risposta completa dall'API:", response.data);

        const newLink = response.data.short_link;

        if (newLink) {
          setLocalGeneratedLink(newLink);
          onLinkGenerated(apartment._id, newLink);
        } else {
          console.error("Campo short_link non trovato nella risposta");
        }
      } catch (error) {
        console.error("Errore durante la chiamata API:", error.message);
      }
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

      // Converti le date in formato ISO per la richiesta
      const dataInizioISO = selectedCheckInDate
        ? selectedCheckInDate.toISOString()
        : null;
      const dataFineISO = selectedCheckOutDate
        ? selectedCheckOutDate.toISOString()
        : null;

      // Effettua la richiesta al backend per aggiornare appartamento
      const response = await axios.put(
        `/api/apartments/${apartment._id}`, // Assicurati che il percorso dell'API sia corretto
        {
          data_inizio: dataInizioISO,
          data_fine: dataFineISO,
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

        // Calcolo del nuovo stato e colore in base alle nuove date
        const today = dayjs();
        let newStatus = "inactive";
        if (dataInizioISO && dataFineISO) {
          const inizioDate = dayjs(dataInizioISO);
          const fineDate = dayjs(dataFineISO);
          if (fineDate.isBefore(today)) {
            newStatus = "expired";
          } else if (
            inizioDate.isBefore(today) ||
            inizioDate.isSame(today, "day")
          ) {
            newStatus = "active";
          }
        }

        // Aggiungi il nuovo stato all'appartamento aggiornato
        const updatedApartment = { ...response.data, status: newStatus };

        onApartmentUpdated(updatedApartment); // Chiamata di callback per aggiornare la lista degli appartamenti
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
            <ActionButtons onSave={handleSaveChanges} onCancel={onClose} />{" "}
            {/* Usa ActionButtons per salvare o cancellare */}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditApartmentModal;
