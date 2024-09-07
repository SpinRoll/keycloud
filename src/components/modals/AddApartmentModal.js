// src/components/modals/AddApartmentModal.js
import React from "react"; // Importo React per creare componenti
import { Dialog, DialogContent, DialogTitle, Box } from "@mui/material"; // Importo i componenti Material-UI necessari per creare la modale
import { pxToRem } from "../../utils/pxToRem"; // Importo la funzione pxToRem per convertire px in rem
import CustomButton from "../customComponents/CustomButton"; // Importo il componente CustomButton per i pulsanti personalizzati
import CustomTextField from "../customComponents/CustomTextField"; // Importo il componente CustomTextField per i campi di input personalizzati
import HomeIcon from "@mui/icons-material/Home"; // Importo un'icona per rappresentare l'appartamento
import { useTranslation } from "react-i18next"; // Importo il hook useTranslation per la gestione delle traduzioni

const AddApartmentModal = ({ open, onClose }) => {
  const { t } = useTranslation(); // Uso il hook useTranslation per ottenere la funzione di traduzione

  // Rendo la modale visibile o invisibile a seconda del valore della prop 'open'
  return (
    <Dialog maxWidth="m" open={open} onClose={onClose}>
      {/* Titolo della modale che mostra il testo tradotto per "Aggiungi Appartamento" */}
      <DialogTitle sx={{ fontSize: pxToRem(20), textAlign: "center" }}>
        {t("add_apartment")}{" "}
        {/* Uso la funzione t per ottenere la traduzione del testo */}
      </DialogTitle>

      {/* Contenuto della modale che contiene i campi di input per i dettagli dell'appartamento */}
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: pxToRem(8),
          padding: pxToRem(20),
        }}>
        {/* Mostro un'icona al centro come rappresentazione dell'appartamento */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <HomeIcon sx={{ width: pxToRem(40), height: pxToRem(40) }} />
        </Box>

        {/* Campi di input per il nome e cognome, organizzati su una riga */}
        <Box sx={{ display: "flex", gap: pxToRem(8), width: "100%" }}>
          <CustomTextField label={t("name")} variant="outlined" fullWidth />{" "}
          {/* Campo per il nome */}
          <CustomTextField
            label={t("surname")}
            variant="outlined"
            fullWidth
          />{" "}
          {/* Campo per il cognome */}
        </Box>

        {/* Campi di input per la via e il numero civico, organizzati su una riga */}
        <Box sx={{ display: "flex", gap: pxToRem(8), width: "100%" }}>
          <CustomTextField label={t("street")} variant="outlined" fullWidth />{" "}
          {/* Campo per la via */}
          <CustomTextField
            label={t("number")}
            variant="outlined"
            fullWidth
          />{" "}
          {/* Campo per il numero civico */}
        </Box>

        {/* Campo di input per il piano/scala */}
        <CustomTextField
          label={t("floor_staircase")}
          variant="outlined"
          fullWidth
        />

        {/* Campo di input per la città */}
        <CustomTextField label={t("city")} variant="outlined" fullWidth />

        {/* Campo di input per il codice postale */}
        <Box sx={{ display: "flex", gap: pxToRem(8), width: "100%" }}>
          <CustomTextField
            label={t("postal_code")}
            variant="outlined"
            fullWidth
          />
        </Box>

        {/* Campi di input per prefisso e numero di telefono, organizzati su una riga */}
        <Box sx={{ display: "flex", gap: pxToRem(8), width: "100%" }}>
          <CustomTextField
            label={t("prefix")}
            variant="outlined"
            fullWidth
            sx={{ flex: 1 }}
          />{" "}
          {/* Campo per il prefisso telefonico */}
          <CustomTextField
            label={t("phone")}
            variant="outlined"
            fullWidth
            sx={{ flex: 2 }}
          />{" "}
          {/* Campo per il numero di telefono */}
        </Box>

        {/* Bottone per salvare i dettagli dell'appartamento e chiudere la modale */}
        <CustomButton variant="contained" onClick={onClose}>
          {t("save")}{" "}
          {/* Uso la funzione t per ottenere la traduzione del testo "Salva" */}
        </CustomButton>
      </DialogContent>
    </Dialog>
  );
};

export default AddApartmentModal; // Esporto il componente per l'uso in altre parti dell'applicazione
