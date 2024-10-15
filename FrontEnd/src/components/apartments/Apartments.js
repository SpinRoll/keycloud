// components/apartments/Apartments.js
import React, { useState } from "react";
import { Container, Box, Typography, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { pxToRem } from "../../utils/pxToRem";
import useApartments from "../../hooks/useApartments";
import ApartmentsList from "./ApartmentsList";
import AddApartmentModal from "../modals/AddApartmentModal";
import EditApartmentModal from "../modals/EditApartmentModal";
import { useTranslation } from "react-i18next";

const Apartments = () => {
  const { t } = useTranslation();
  const [apartments, setApartments] = useApartments();
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedApartment, setSelectedApartment] = useState(null);

  const handleOpenModal = (type, apartment = null) => {
    setSelectedApartment(apartment);
    type === "add" ? setOpenAdd(true) : setOpenEdit(true);
  };

  const handleDeleteApartment = (deletedApartmentId) => {
    setApartments((prevApartments) =>
      prevApartments.filter((apartment) => apartment._id !== deletedApartmentId)
    );
    handleClose();
  };

  const handleClose = () => {
    setOpenAdd(false);
    setOpenEdit(false);
    setSelectedApartment(null);
  };

  const handleAddApartment = (newApartment) => {
    setApartments((prev) => [...prev, newApartment]);
    handleClose();
  };

  const handleUpdateApartment = (updatedApartment) => {
    setApartments((prevApartments) =>
      prevApartments.map((apartment) =>
        apartment._id === updatedApartment._id ? updatedApartment : apartment
      )
    );
    handleClose();
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

        <ApartmentsList
          apartments={apartments}
          onEditApartment={(apartment) => handleOpenModal("edit", apartment)}
        />

        {/* Add Apartment Button */}
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

        {/* Modals */}
        <AddApartmentModal
          open={openAdd}
          onClose={handleClose}
          onAddApartment={handleAddApartment}
        />

        <EditApartmentModal
          open={openEdit}
          onClose={handleClose}
          apartment={selectedApartment}
          onApartmentUpdated={handleUpdateApartment}
          onApartmentDeleted={handleDeleteApartment}
        />
      </Box>
    </Container>
  );
};

export default Apartments;
