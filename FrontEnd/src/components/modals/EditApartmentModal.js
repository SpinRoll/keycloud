import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle, Box } from "@mui/material";
import { pxToRem } from "../../utils/pxToRem";
import LinkDurationField from "../customComponents/LinkDurationField";
import CustomButton from "../customComponents/CustomButton";
import FixedLinkSwitch from "../customComponents/FixedLinkSwitch";
import DatePickers from "../customComponents/DatePickers";
import ShortLinkManager from "./ShortLinkManager";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import axios from "axios";
import LoadingSpin from "../customComponents/LoadingSpinner";
import SnackBarSuccess from "../snackBars/SnackBarSuccess"; // Import del nuovo snackbar

const EditApartmentModal = ({
  open,
  onClose,
  apartment,
  onApartmentUpdated,
  disabled,
}) => {
  const { t } = useTranslation();
  const [selectedCheckInDate, setSelectedCheckInDate] = useState(
    apartment ? dayjs(apartment.data_inizio) : null
  );
  const [selectedCheckOutDate, setSelectedCheckOutDate] = useState(
    apartment ? dayjs(apartment.data_fine) : null
  );
  const [linkDuration, setLinkDuration] = useState("1 gg");
  const [isFixedLink, setIsFixedLink] = useState(
    apartment?.fixed_link || false
  );
  const [apartmentLink, setApartmentLink] = useState(apartment?.link || ""); // Aggiungi lo stato per il link
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Stato per lo Snackbar di successo
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Messaggio dello Snackbar

  useEffect(() => {
    if (apartment) {
      setSelectedCheckInDate(
        apartment.data_inizio ? dayjs(apartment.data_inizio) : null
      );
      setSelectedCheckOutDate(
        apartment.data_fine ? dayjs(apartment.data_fine) : null
      );
      setIsFixedLink(apartment.fixed_link || false);
      setApartmentLink(apartment.link || ""); // Inizializza il link
    }
  }, [apartment]);

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

  const handleSaveChanges = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Nessun token trovato. Utente non autenticato.");
        return;
      }

      // Converti le date in formato ISO per la richiesta
      const dataInizioISO = isFixedLink
        ? null
        : selectedCheckInDate
        ? selectedCheckInDate.toISOString()
        : null;
      const dataFineISO = isFixedLink
        ? null
        : selectedCheckOutDate
        ? selectedCheckOutDate.toISOString()
        : null;

      // Invia i dati dell'appartamento e il link aggiornato
      const response = await axios.put(
        `/api/apartments/${apartment._id}`,
        {
          data_inizio: dataInizioISO,
          data_fine: dataFineISO,
          fixed_link: isFixedLink,
          link: apartmentLink, // Usa il nuovo stato per il link
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Appartamento aggiornato con successo:", response.data);
        onApartmentUpdated(response.data); // Chiamata di callback per aggiornare la lista degli appartamenti
        onClose(); // Chiudi la modale
        setSnackbarMessage(t("save_success")); // Messaggio di successo
        setSnackbarOpen(true); // Mostra lo snackbar
      } else {
        setSnackbarMessage(t("save_error")); // Messaggio di errore generico
        setSnackbarOpen(true); // Mostra lo snackbar di errore
      }
    } catch (error) {
      console.error(
        "Errore durante l'aggiornamento dell'appartamento:",
        error.response ? error.response.data : error.message
      );
      setSnackbarMessage(t("save_error")); // Messaggio di errore
      setSnackbarOpen(true); // Mostra lo snackbar
    } finally {
      setLoading(false); // Fine caricamento
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false); // Chiudi lo snackbar
  };

  const handleLinkGenerated = (newLink) => {
    console.log("Link generato:", newLink);
    setApartmentLink(newLink); // Aggiorna il link nello stato
  };

  const handleLinkDeleted = () => {
    console.log("Link cancellato");
    setApartmentLink(""); // Resetta il link nello stato
  };

  return (
    <>
      {loading ? (
        <LoadingSpin size={40} />
      ) : (
        <Dialog width="m" open={open} onClose={onClose}>
          <DialogTitle sx={{ fontSize: pxToRem(24), textAlign: "center" }}>
            {apartment ? `Edit ${apartment.nome}` : "Edit Apartment"}
          </DialogTitle>

          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: pxToRem(8),
              padding: pxToRem(16),
            }}>
            {apartment && (
              <>
                <LinkDurationField linkDuration={linkDuration} />
                <FixedLinkSwitch
                  isFixedLink={isFixedLink}
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    setIsFixedLink(isChecked);

                    if (isChecked) {
                      setSelectedCheckInDate(null);
                      setSelectedCheckOutDate(null);
                    }
                  }}
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

                {/* Utilizzo del nuovo componente ShortLinkManager */}
                <ShortLinkManager
                  apartment={apartment}
                  onLinkGenerated={handleLinkGenerated}
                  onLinkDeleted={handleLinkDeleted}
                />

                <CustomButton
                  onClick={handleSaveChanges}
                  variant="contained"
                  color="primary">
                  {t("save")}
                </CustomButton>
              </>
            )}
          </DialogContent>
        </Dialog>
      )}

      {/* Snackbar per il messaggio di successo */}
      <SnackBarSuccess
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        messageKey={snackbarMessage} // Passa "save_success" o "save_error"
      />
    </>
  );
};

export default EditApartmentModal;
