// src/components/modals/AddApartmentModal.js
import React, { useState } from "react"; // Importo React e useState per gestire lo stato
import { Dialog, DialogContent, DialogTitle, Box } from "@mui/material"; // Importo i componenti Material-UI necessari per creare la modale
import { pxToRem } from "../../utils/pxToRem"; // Importo la funzione pxToRem per convertire px in rem
import CustomButton from "../customComponents/CustomButton"; // Importo il componente CustomButton per i pulsanti personalizzati
import CustomTextField from "../customComponents/CustomTextField"; // Importo il componente CustomTextField per i campi di input personalizzati
import HomeIcon from "@mui/icons-material/Home"; // Importo un'icona per rappresentare l'appartamento
import { useTranslation } from "react-i18next"; // Importo il hook useTranslation per la gestione delle traduzioni
import axios from "axios"; // Importo axios per le richieste HTTP

const AddApartmentModal = ({ open, onClose, onAddApartment }) => {
  const { t } = useTranslation(); // Uso il hook useTranslation per ottenere la funzione di traduzione

  // Stato per gestire i campi di input del form
  const [formValues, setFormValues] = useState({
    nome: "", // Nome dell'appartamento
    via: "", // Via (Strada)
    numero: "", // Numero civico
    piano_scala: "", // Piano/Scala
    citta: "", // Città
    cap: "", // Codice postale
    prefisso: "", // Prefisso telefonico
    telefono: "", // Numero di telefono
    // link: "", // Link all'appartamento
    // data_inizio: "", // Data di inizio
    // data_fine: "", // Data di fine
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
  const handleAdd = async () => {
    try {
      const token = localStorage.getItem("token"); // Recupera il token JWT dal localStorage
      if (!token) {
        console.error("Nessun token trovato. Utente non autenticato.");
        return;
      }

      // Effettua la richiesta al backend per salvare il nuovo appartamento
      const response = await axios.post(
        "http://localhost:5000/api/apartments", // Assicurati che il percorso dell'API sia corretto
        formValues,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Aggiungi il token JWT nell'intestazione
          },
        }
      );

      // Gestisci la risposta dal server
      if (response.status === 201) {
        console.log("Appartamento aggiunto con successo:", response.data);
        onAddApartment(response.data); // Aggiungi l'appartamento alla lista degli appartamenti
        setFormValues({
          nome: "",
          via: "",
          numero: "",
          piano_scala: "",
          citta: "",
          cap: "",
          prefisso: "",
          telefono: "",
          // link: "",
          // data_inizio: "",
          // data_fine: "",
        });
        onClose(); // Chiudi la modale
      }
    } catch (error) {
      console.error("Errore durante l'aggiunta dell'appartamento:", error.response ? error.response.data : error.message);
    }
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

        {/* Campo di input per il piano/scala */}
        <CustomTextField
          label={t("floor_staircase")}
          variant="outlined"
          fullWidth
          name="piano_scala"
          value={formValues.piano_scala}
          onChange={handleChange}
        />

        {/* Campo di input per la città */}
        <CustomTextField
          label={t("city")}
          variant="outlined"
          fullWidth
          name="citta"
          value={formValues.citta}
          onChange={handleChange}
        />

        {/* Campo di input per il codice postale */}
        <CustomTextField
          label={t("postal_code")}
          variant="outlined"
          fullWidth
          name="cap"
          value={formValues.cap}
          onChange={handleChange}
        />

        {/* Campi di input per prefisso e numero di telefono, organizzati su una riga */}
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

        {/* Campo di input per il link dell'appartamento */}
        {/* <CustomTextField
          label={t("link")}
          variant="outlined"
          fullWidth
          name="link"
          value={formValues.link}
          onChange={handleChange}
        /> */}

        {/* Campi di input per le date di inizio e fine */}
        {/* <Box sx={{ display: "flex", gap: pxToRem(8), width: "100%" }}>
          <CustomTextField
            label={t("start_date")}
            type="date"
            variant="outlined"
            fullWidth
            name="data_inizio"
            value={formValues.data_inizio}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
          <CustomTextField
            label={t("end_date")}
            type="date"
            variant="outlined"
            fullWidth
            name="data_fine"
            value={formValues.data_fine}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </Box> */}

        {/* Bottone per salvare i dettagli dell'appartamento e chiudere la modale */}
        <CustomButton variant="contained" onClick={handleAdd}>
          {t("save")}
        </CustomButton>
      </DialogContent>
    </Dialog>
  );
};

export default AddApartmentModal; // Esporto il componente per l'uso in altre parti dell'applicazione
