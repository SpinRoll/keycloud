import React, { useState } from "react";
import {
  Box,
  // IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import GenerateLinkButton from "../customComponents/GenerateLinkButton";
import CopyLinkField from "../customComponents/CopyLinkField";
// import DeleteIcon from "@mui/icons-material/Delete"; // Icona di eliminazione
import axios from "axios";
import { useTranslation } from "react-i18next";
import LoadingSpin from "../customComponents/LoadingSpinner"; // Importa lo spinner
import SnackBarSuccess from "../snackBars/SnackBarSuccess"; // Importa lo snackbar

const ShortLinkManager = ({
  apartment,
  onLinkGenerated,
  onLinkDeleted,
  isFixedLink,
  selectedCheckInDate,
  selectedCheckOutDate,
}) => {
  const [localGeneratedLink, setLocalGeneratedLink] = useState(
    apartment?.link || ""
  );
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false); // Stato per la Dialog di conferma
  const [loading, setLoading] = useState(false); // Stato per il caricamento
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Stato per lo snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Messaggio dello snackbar
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // Stato per il tipo di snackbar
  const { t } = useTranslation();

  // Funzione per aprire lo snackbar con il messaggio corretto
  const handleSnackbarOpen = (messageKey, severity) => {
    setSnackbarMessage(messageKey);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Funzione per generare un link
  const generateRandomLink = async () => {
    if (apartment) {
      try {
        setLoading(true); // Attiva il caricamento
        const apiUrl = `https://key-tick-nice.ngrok-free.app/generate?IDapt=${apartment._id}`;
        const response = await axios.get(apiUrl, {
          headers: {
            "Ngrok-Skip-Browser-Warning": "true",
          },
        });

        const newLink = response.data.short_link;
        if (newLink) {
          setLocalGeneratedLink(newLink);
          onLinkGenerated(newLink); // Passa il nuovo link al componente padre
          handleSnackbarOpen("generate_success", "success"); // Mostra il messaggio di successo
        } else {
          console.error("Campo short_link non trovato nella risposta");
          handleSnackbarOpen("generate_error", "error"); // Mostra il messaggio di errore
        }
      } catch (error) {
        console.error("Errore durante la generazione del link:", error.message);
        handleSnackbarOpen("generate_error", "error"); // Mostra il messaggio di errore
      } finally {
        setLoading(false); // Disattiva il caricamento
      }
    }
  };

  // Funzione per copiare il link negli appunti
  const copyToClipboard = () => {
    if (localGeneratedLink) {
      navigator.clipboard
        .writeText(localGeneratedLink)
        .then(() => {
          console.log("Link copiato negli appunti!");
          handleSnackbarOpen("copy_success", "success"); // Mostra il messaggio di copia riuscita
        })
        .catch((err) => {
          console.error("Errore durante la copia negli appunti: ", err);
          handleSnackbarOpen("copy_error", "error"); // Mostra il messaggio di errore
        });
    }
  };

  // Funzione per cancellare il link
  const deleteLink = async () => {
    try {
      setLoading(true); // Attiva il caricamento
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Nessun token trovato. Utente non autenticato.");
        return;
      }

      // Cancella il link localmente e aggiorna il backend
      setLocalGeneratedLink(""); // Reset locale
      onLinkDeleted(); // Notifica il padre che il link è stato cancellato

      // Aggiorna il backend con il link vuoto
      const response = await axios.put(
        `/api/apartments/${apartment._id}`,
        {
          link: "", // Invia un link vuoto
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Link cancellato con successo:", response.data);
        onLinkDeleted(); // Notifica il padre che il link è stato cancellato
        handleSnackbarOpen("delete_link_success", "success"); // Mostra il messaggio di successo
      }
    } catch (error) {
      console.error("Errore durante la cancellazione del link:", error.message);
      handleSnackbarOpen("delete_link_error", "error"); // Mostra il messaggio di errore
    } finally {
      setLoading(false); // Disattiva il caricamento
    }
  };

  // // Funzione per aprire la Dialog di conferma
  // const handleDeleteClick = () => {
  //   setOpenConfirmDialog(true);
  // };

  // Funzione per chiudere la Dialog senza eliminare il link
  const handleCloseDialog = () => {
    setOpenConfirmDialog(false);
  };

  // Funzione per confermare l'eliminazione del link
  const handleConfirmDelete = () => {
    setOpenConfirmDialog(false);
    deleteLink(); // Chiamare la funzione di eliminazione
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <>
        {loading ? (
          <LoadingSpin size={40} /> // Mostra lo spinner se loading è attivo
        ) : (
          <GenerateLinkButton
            onClick={generateRandomLink}
            // isDisabled={localGeneratedLink !== ""}
          />
        )}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* Campo di copia del link */}
          <CopyLinkField link={localGeneratedLink} onCopy={copyToClipboard} />
          {/* Icona Delete */}
          {/* <IconButton
            onClick={handleDeleteClick}
            disabled={!localGeneratedLink}
            aria-label={t("delete_link")}
            sx={{
              color: "error.main",
            }}>
            <DeleteIcon />
          </IconButton> */}
        </Box>

        {/* Dialog di conferma */}
        <Dialog
          open={openConfirmDialog}
          onClose={handleCloseDialog}
          aria-labelledby="confirm-delete-title"
          aria-describedby="confirm-delete-description">
          <DialogTitle id="confirm-delete-title">
            {t("confirm_delete")}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="confirm-delete-description">
              {t("confirm_delete_message")}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={handleCloseDialog}
              color="primary">
              {t("cancel")}
            </Button>
            <Button
              variant="outlined"
              onClick={handleConfirmDelete}
              color="error"
              autoFocus>
              {t("delete")}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar per successo o errore */}
        <SnackBarSuccess
          open={snackbarOpen}
          onClose={handleSnackbarClose}
          messageKey={snackbarMessage}
          severity={snackbarSeverity}
        />
      </>
    </Box>
  );
};

export default ShortLinkManager;
