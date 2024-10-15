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
import SnackBarSuccess from "../snackBars/SnackBarSuccess";
import CustomTextField from "../customComponents/CustomTextField";
import HomeIcon from "@mui/icons-material/Home";

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
  const [apartmentLink, setApartmentLink] = useState(apartment?.link || "");
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    nome: "",
    via: "",
    numero: "",
    piano_scala: "",
    citta: "",
    cap: "",
    prefisso: "",
    telefono: "",
  });

  useEffect(() => {
    if (apartment) {
      setFormValues({
        nome: apartment.nome || "",
        via: apartment.via || "",
        numero: apartment.numero || "",
        piano_scala: apartment.piano_scala || "",
        citta: apartment.citta || "",
        cap: apartment.cap || "",
        prefisso: apartment.prefisso || "",
        telefono: apartment.telefono || "",
      });
      setSelectedCheckInDate(
        apartment.data_inizio ? dayjs(apartment.data_inizio) : null
      );
      setSelectedCheckOutDate(
        apartment.data_fine ? dayjs(apartment.data_fine) : null
      );
      setIsFixedLink(apartment.fixed_link || false);
      setApartmentLink(apartment.link || "");
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

  // Funzione per gestire i cambiamenti dei campi di input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
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

      const response = await axios.put(
        `/api/apartments/${apartment._id}`,
        {
          ...formValues,
          data_inizio: dataInizioISO,
          data_fine: dataFineISO,
          fixed_link: isFixedLink,
          link: apartmentLink,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Appartamento aggiornato con successo:", response.data);
        onApartmentUpdated(response.data);
        setSnackbarMessage(t("save_success"));
        setSnackbarOpen(true);
        setLoading(false);
        onClose();
        closeEditModal();
      } else {
        setSnackbarMessage(t("save_error"));
        setSnackbarOpen(true);
        setLoading(false);
      }
    } catch (error) {
      console.error(
        "Errore durante l'aggiornamento dell'appartamento:",
        error.response ? error.response.data : error.message
      );
      setSnackbarMessage(t("save_error"));
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
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

                <ShortLinkManager
                  apartment={apartment}
                  onLinkGenerated={(newLink) => setApartmentLink(newLink)}
                  onLinkDeleted={() => setApartmentLink("")}
                />

                <CustomButton
                  onClick={handleSaveChanges}
                  variant="contained"
                  color="primary">
                  {t("save")}
                </CustomButton>
                <CustomButton
                  onClick={openEditModal}
                  variant="contained"
                  color="primary">
                  {t("edit")}
                </CustomButton>
              </>
            )}
          </DialogContent>
        </Dialog>
      )}

      {/* Modale per la modifica con i campi come in AddApartmentModal */}
      <Dialog
        maxWidth="m"
        open={isEditModalOpen}
        onClose={closeEditModal}
        sx={{
          borderRadius: pxToRem(8),
          boxShadow: `0px ${pxToRem(0)} ${pxToRem(10)} #635FC7`,
        }}>
        <DialogTitle sx={{ fontSize: pxToRem(20), textAlign: "center" }}>
          {t("edit_apartment")}
        </DialogTitle>

        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: pxToRem(8),
            padding: pxToRem(16),
          }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <HomeIcon sx={{ width: pxToRem(40), height: pxToRem(40) }} />
          </Box>

          <CustomTextField
            label={t("name")}
            variant="outlined"
            fullWidth
            name="nome"
            value={formValues.nome}
            onChange={handleChange}
          />

          <Box sx={{ display: "flex", gap: pxToRem(8), width: "100%" }}>
            <CustomTextField
              label={t("street")}
              variant="outlined"
              fullWidth
              name="via"
              value={formValues.via}
              onChange={handleChange}
            />
            <CustomTextField
              label={t("number")}
              variant="outlined"
              fullWidth
              name="numero"
              value={formValues.numero}
              onChange={handleChange}
            />
          </Box>

          <CustomTextField
            label={t("floor_staircase")}
            variant="outlined"
            fullWidth
            name="piano_scala"
            value={formValues.piano_scala}
            onChange={handleChange}
          />

          <CustomTextField
            label={t("city")}
            variant="outlined"
            fullWidth
            name="citta"
            value={formValues.citta}
            onChange={handleChange}
          />

          <CustomTextField
            label={t("postal_code")}
            variant="outlined"
            fullWidth
            name="cap"
            value={formValues.cap}
            onChange={handleChange}
          />

          <Box sx={{ display: "flex", gap: pxToRem(8), width: "100%" }}>
            <CustomTextField
              label={t("prefix")}
              variant="outlined"
              fullWidth
              name="prefisso"
              value={formValues.prefisso}
              onChange={handleChange}
              sx={{ flex: 1 }}
            />
            <CustomTextField
              label={t("phone")}
              variant="outlined"
              fullWidth
              name="telefono"
              value={formValues.telefono}
              onChange={handleChange}
              sx={{ flex: 3 }}
            />
          </Box>

          <CustomButton variant="contained" onClick={handleSaveChanges}>
            {t("save")}
          </CustomButton>
        </DialogContent>
      </Dialog>

      {/* Snackbar per il messaggio di successo */}
      <SnackBarSuccess
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        messageKey={snackbarMessage}
      />
    </>
  );
};

export default EditApartmentModal;
