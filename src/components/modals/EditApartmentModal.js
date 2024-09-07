// src/components/modals/EditApartmentModal.js
import React, { useState } from "react"; // Importo React e useState per gestire lo stato
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  IconButton,
  Switch,
  FormControlLabel,
  TextField,
  Tooltip, // Importo Tooltip da Material-UI per mostrare messaggi su hover
} from "@mui/material"; // Importo i componenti Material-UI necessari per creare la modale
import { pxToRem } from "../../utils/pxToRem"; // Importo la funzione pxToRem per convertire px in rem
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"; // Importo l'icona CalendarTodayIcon
import ContentCopyIcon from "@mui/icons-material/ContentCopy"; // Importo l'icona ContentCopyIcon
import DeleteIcon from "@mui/icons-material/Delete"; // Importo l'icona DeleteIcon
import CustomButton from "../customComponents/CustomButton"; // Importo il componente CustomButton per i pulsanti personalizzati
import CustomTextField from "../customComponents/CustomTextField"; // Importo il componente CustomTextField per i campi di input personalizzati
import { useTheme } from "@mui/material/styles"; // Importo useTheme per utilizzare il tema corrente
import { useTranslation } from "react-i18next"; // Importo il hook useTranslation per la gestione delle traduzioni

const EditApartmentModal = ({ open, onClose, apartment, disabled }) => {
  const theme = useTheme(); // Uso il tema corrente
  const { t } = useTranslation(); // Uso il hook useTranslation per ottenere la funzione di traduzione

  const [generatedLink, setGeneratedLink] = useState(""); // Stato per il link generato

  // Funzione per generare un link random
  const generateRandomLink = () => {
    const randomString = Math.random().toString(36).substring(2, 10); // Genero una stringa casuale
    const newLink = `HTTP://bitfly.es/${randomString}`; // Creo il link completo
    setGeneratedLink(newLink); // Aggiorno lo stato con il nuovo link generato
  };

  // Funzione per copiare il link generato negli appunti
  const copyToClipboard = () => {
    if (generatedLink) {
      // Verifica se il link generato è disponibile
      navigator.clipboard
        .writeText(generatedLink) // Copia il link negli appunti
        .then(() => {
          console.log("Link copiato negli appunti!"); // Messaggio di conferma
        })
        .catch((err) => {
          console.error("Errore durante la copia negli appunti: ", err); // Messaggio di errore
        });
    }
  };

  // Controllo per abilitare/disabilitare il pulsante "Generate"
  const isGenerateButtonDisabled = disabled || generatedLink !== "";

  return (
    <Dialog open={open} onClose={onClose}>
      {/* Titolo della modale che mostra il nome dell'appartamento selezionato o un titolo di default */}
      <DialogTitle sx={{ fontSize: pxToRem(24), textAlign: "center" }}>
        {apartment ? `${t("edit")} ${apartment.name}` : t("edit_apartment")}
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
            <CustomTextField
              label={t("link_duration")}
              variant="outlined"
              defaultValue="1 gg"
            />

            <Box sx={{ display: "flex", gap: pxToRem(8) }}>
              <CustomButton variant="contained">-</CustomButton>
              <CustomButton variant="contained">+</CustomButton>
            </Box>

            <FormControlLabel
              control={<Switch color="primary" />}
              label={t("fixed_link")}
            />

            <CustomTextField
              label={t("select_period")}
              variant="outlined"
              InputProps={{ endAdornment: <CalendarTodayIcon /> }}
            />

            {/* Bottone per generare un nuovo link con Tooltip per il pulsante disabilitato */}
            <Tooltip
              title={
                isGenerateButtonDisabled ? t("cannot_generate_again") : "" // Messaggio di avviso quando il pulsante è disabilitato
              }>
              <span>
                <CustomButton
                  variant="contained"
                  onClick={generateRandomLink}
                  disabled={isGenerateButtonDisabled} // Controllo per disabilitare il pulsante
                  sx={{
                    ...(isGenerateButtonDisabled && {
                      border: `1px solid ${theme.colors.red}`, // Aggiungo un bordo rosso se disabilitato
                      "&:hover": {
                        cursor: "not-allowed", // Imposta il cursore su "not-allowed"
                        border: `1px solid ${theme.colors.red}`, // Mantieni il bordo rosso su hover
                      },
                    }),
                  }}>
                  {t("generate")}
                </CustomButton>
              </span>
            </Tooltip>

            {/* Campo di input per visualizzare il link generato e un pulsante per copiarlo */}
            <Box
              sx={{ display: "flex", alignItems: "center", gap: pxToRem(8) }}>
              <TextField
                variant="outlined"
                value={generatedLink} // Visualizza il link generato nello stato
                InputProps={{
                  readOnly: true, // Impedisce la modifica diretta dell'input
                }}
              />
              <IconButton onClick={copyToClipboard}>
                <ContentCopyIcon />
              </IconButton>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: pxToRem(16),
              }}>
              <CustomButton variant="contained" color="primary">
                {t("save")}
              </CustomButton>

              <CustomButton variant="outlined" color="primary">
                {t("edit")}
              </CustomButton>

              <CustomButton
                variant="outlined"
                sx={{
                  color: theme.colors.red,
                  borderColor: theme.colors.red,
                  "&:hover": {
                    backgroundColor: theme.colors.lightRed,
                    borderColor: theme.colors.lightRed,
                    color: theme.colors.red,
                  },
                }}
                startIcon={<DeleteIcon />}>
                {t("delete_apartment")}
              </CustomButton>
            </Box>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditApartmentModal; // Esporto il componente per l'uso in altre parti dell'applicazione
