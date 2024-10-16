// components/modals/EditApartmentModal.js
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle, Button, Box } from "@mui/material";
import { pxToRem } from "../../utils/pxToRem";
import LinkSettings from "../forms/LinkSettings";
import { useTheme } from "@mui/material/styles";
import ShortLinkManager from "./ShortLinkManager";
import ApartmentForm from "../forms/ApartmentForm";
import LoadingSpin from "../customComponents/LoadingSpinner";
import SnackBarSuccess from "../snackBars/SnackBarSuccess";
import CustomButton from "../customComponents/CustomButton";
import { useTranslation } from "react-i18next";
import axios from "axios";
import dayjs from "dayjs";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

const EditApartmentModal = ({
  open,
  onClose,
  apartment,
  onApartmentUpdated,
  onApartmentDeleted,
}) => {
  const { t } = useTranslation();
  // eslint-disable-next-line
  const theme = useTheme();
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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const calculateLinkDuration = (checkIn, checkOut) => {
    if (checkIn && checkOut) {
      if (checkOut.isBefore(checkIn)) {
        setLinkDuration("Invalid date");
      } else {
        const duration = checkOut.diff(checkIn, "day");
        setLinkDuration(`${duration} days`);
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

  const handleDeleteApartment = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found. User not authenticated.");
        return;
      }

      const response = await axios.delete(`/api/apartments/${apartment._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setSnackbarMessage(t("delete_success"));
        setSnackbarOpen(true);
        setLoading(false);
        onApartmentDeleted(apartment._id); // Notify parent component about deletion
        closeDeleteModal();
        onClose();
      } else {
        setSnackbarMessage(t("delete_error"));
        setSnackbarOpen(true);
        setLoading(false);
      }
    } catch (error) {
      console.error(
        "Error deleting apartment:",
        error.response ? error.response.data : error.message
      );
      setSnackbarMessage(t("delete_error"));
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleSaveChanges = async () => {
    // Validation before saving
    if (apartmentLink && apartmentLink.trim() !== "") {
      if (!isFixedLink && (!selectedCheckInDate || !selectedCheckOutDate)) {
        // Cannot save because fixed_link is false and dates are empty
        setSnackbarMessage(t("error_dates_required"));
        setSnackbarOpen(true);
        return;
      }

      if (isFixedLink && (selectedCheckInDate || selectedCheckOutDate)) {
        // Cannot save because fixed_link is true and dates are provided
        setSnackbarMessage(t("error_fixed_link_dates_conflict"));
        setSnackbarOpen(true);
        return;
      }
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found. User not authenticated.");
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
        "Error updating apartment:",
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

  const isValids =
    apartmentLink &&
    apartmentLink.trim() !== "" &&
    ((isFixedLink && !selectedCheckInDate && !selectedCheckOutDate) ||
      (!isFixedLink && selectedCheckInDate && selectedCheckOutDate));

  return (
    <>
      {loading ? (
        <LoadingSpin size={40} />
      ) : (
        <Dialog width="m" open={open} onClose={onClose}>
          <DialogTitle sx={{ fontSize: pxToRem(24), textAlign: "center" }}>
            {apartment ? `${t("edit")} ${apartment.nome}` : t("edit_apartment")}
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
                <LinkSettings
                  linkDuration={linkDuration}
                  isFixedLink={isFixedLink}
                  setIsFixedLink={setIsFixedLink}
                  selectedCheckInDate={selectedCheckInDate}
                  setSelectedCheckInDate={setSelectedCheckInDate}
                  selectedCheckOutDate={selectedCheckOutDate}
                  setSelectedCheckOutDate={setSelectedCheckOutDate}
                />

                <ShortLinkManager
                  apartment={apartment}
                  onLinkGenerated={(newLink) => setApartmentLink(newLink)}
                  onLinkDeleted={() => setApartmentLink("")}
                  isFixedLink={isFixedLink}
                  selectedCheckInDate={selectedCheckInDate}
                  selectedCheckOutDate={selectedCheckOutDate}
                />
                <Box
                  sx={{
                    display: "flex",
                    gap: pxToRem(16),
                    justifyContent: "center",
                    flexDirection: "column",
                  }}>
                  {/* Save button */}
                  <CustomButton
                    onClick={handleSaveChanges}
                    variant="contained"
                    color="primary"
                    disabled={!isValids}>
                    {t("save")}
                  </CustomButton>
                  {/* Edit button */}
                  <CustomButton
                    onClick={openEditModal}
                    variant="contained"
                    color="primary">
                    {t("edit")}
                  </CustomButton>

                  {/* Delete button */}
                  <Button
                    onClick={openDeleteModal}
                    variant="outlined"
                    color="error">
                    {t("delete")}
                  </Button>
                </Box>
              </>
            )}
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Apartment Details Modal */}
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
          <ApartmentForm
            formValues={formValues}
            handleChange={handleChange}
            handleSave={handleSaveChanges}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        open={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteApartment}
        apartmentName={apartment?.nome || ""}
      />

      {/* Snackbar for success message */}
      <SnackBarSuccess
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        messageKey={snackbarMessage}
      />
    </>
  );
};

export default EditApartmentModal;
