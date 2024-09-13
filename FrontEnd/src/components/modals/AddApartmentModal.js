// src/components/modals/AddApartmentModal.js
import React, { useState } from "react"; // Importo React e useState per gestire lo stato
import { Dialog, DialogContent, DialogTitle, Box } from "@mui/material"; // Importo i componenti Material-UI necessari per creare la modale
import { pxToRem } from "../../utils/pxToRem"; // Importo la funzione pxToRem per convertire px in rem
import CustomButton from "../customComponents/CustomButton"; // Importo il componente CustomButton per i pulsanti personalizzati
import CustomTextField from "../customComponents/CustomTextField"; // Importo il componente CustomTextField per i campi di input personalizzati
import HomeIcon from "@mui/icons-material/Home"; // Importo un'icona per rappresentare l'appartamento
import { useTranslation } from "react-i18next"; // Importo il hook useTranslation per la gestione delle traduzioni

const AddApartmentModal = ({ open, onClose, onAddApartment }) => {
  const { t } = useTranslation(); // Uso il hook useTranslation per ottenere la funzione di traduzione

  // Stato per gestire i campi di input del form
  const [formValues, setFormValues] = useState({
    name: "",
    street: "",
    number: "",
    floor_staircase: "",
    city: "",
    postal_code: "",
    prefix: "",
    phone: "",
  });

  // Funzione per gestire i cambiamenti dei campi di input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Funzione per gestire l'aggiunta di un nuovo appartamento
  const handleAdd = () => {
    const newApartment = {
      id: Date.now(), // Genero un ID unico per il nuovo appartamento
      name: formValues.name,
      location: formValues.city,
      period: "-", // Imposta un valore predefinito per il periodo, può essere modificato successivamente
      status: "inactive", // Imposta uno stato predefinito
    };
    onAddApartment(newApartment); // Chiamo la funzione di callback per aggiungere l'appartamento
    setFormValues({
      name: "",
      street: "",
      number: "",
      floor_staircase: "",
      city: "",
      postal_code: "",
      prefix: "",
      phone: "",
    });
    onClose(); // Chiudo la modale
  };

  return (
    <Dialog maxWidth="m" open={open} onClose={onClose}>
      <DialogTitle sx={{ fontSize: pxToRem(20), textAlign: "center" }}>
        {t("add_apartment")}
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

        {/* Campi di input per il nome e la via, organizzati su una riga */}
        <Box sx={{ display: "flex", gap: pxToRem(8), width: "100%" }}>
          <CustomTextField
            label={t("name")}
            variant="outlined"
            fullWidth
            name="name"
            value={formValues.name}
            onChange={handleChange}
          />
        </Box>

        {/* Campi di input per la via e il numero civico, organizzati su una riga */}
        <Box sx={{ display: "flex", gap: pxToRem(8), width: "100%" }}>
          <CustomTextField
            label={t("street")}
            variant="outlined"
            fullWidth
            name="street"
            value={formValues.street}
            onChange={handleChange}
          />
          <CustomTextField
            label={t("number")}
            variant="outlined"
            fullWidth
            name="number"
            value={formValues.number}
            onChange={handleChange}
          />
        </Box>

        {/* Campo di input per il piano/scala */}
        <CustomTextField
          label={t("floor_staircase")}
          variant="outlined"
          fullWidth
          name="floor_staircase"
          value={formValues.floor_staircase}
          onChange={handleChange}
        />

        {/* Campo di input per la città */}
        <CustomTextField
          label={t("city")}
          variant="outlined"
          fullWidth
          name="city"
          value={formValues.city}
          onChange={handleChange}
        />

        {/* Campo di input per il codice postale */}
        <Box sx={{ display: "flex", gap: pxToRem(8), width: "100%" }}>
          <CustomTextField
            label={t("postal_code")}
            variant="outlined"
            fullWidth
            name="postal_code"
            value={formValues.postal_code}
            onChange={handleChange}
          />
        </Box>

        {/* Campi di input per prefisso e numero di telefono, organizzati su una riga */}
        <Box sx={{ display: "flex", gap: pxToRem(8), width: "100%" }}>
          <CustomTextField
            label={t("prefix")}
            variant="outlined"
            fullWidth
            name="prefix"
            value={formValues.prefix}
            onChange={handleChange}
            sx={{ flex: 1 }}
          />
          <CustomTextField
            label={t("phone")}
            variant="outlined"
            fullWidth
            name="phone"
            value={formValues.phone}
            onChange={handleChange}
            sx={{ flex: 2 }}
          />
        </Box>

        {/* Bottone per salvare i dettagli dell'appartamento e chiudere la modale */}
        <CustomButton variant="contained" onClick={handleAdd}>
          {t("save")}
        </CustomButton>
      </DialogContent>
    </Dialog>
  );
};

export default AddApartmentModal; // Esporto il componente per l'uso in altre parti dell'applicazione
