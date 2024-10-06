import React, { useState } from "react";
import {
  Box,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import GenerateLinkButton from "../customComponents/GenerateLinkButton";
import CopyLinkField from "../customComponents/CopyLinkField";
import DeleteIcon from "@mui/icons-material/Delete"; // Icona di eliminazione
import axios from "axios";
import { useTranslation } from "react-i18next";

const ShortLinkManager = ({ apartment, onLinkGenerated, onLinkDeleted }) => {
  const [localGeneratedLink, setLocalGeneratedLink] = useState(
    apartment?.link || ""
  );
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false); // Stato per la Dialog di conferma
  const { t } = useTranslation();

  // Funzione per generare un link
  const generateRandomLink = async () => {
    if (apartment) {
      try {
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
        } else {
          console.error("Campo short_link non trovato nella risposta");
        }
      } catch (error) {
        console.error("Errore durante la generazione del link:", error.message);
      }
    }
  };

  // Funzione per copiare il link negli appunti
  const copyToClipboard = () => {
    if (localGeneratedLink) {
      navigator.clipboard
        .writeText(localGeneratedLink)
        .then(() => console.log("Link copiato negli appunti!"))
        .catch((err) =>
          console.error("Errore durante la copia negli appunti: ", err)
        );
    }
  };

  // Funzione per cancellare il link
  const deleteLink = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Nessun token trovato. Utente non autenticato.");
        return;
      }

      // Cancella il link localmente e aggiorna il backend
      setLocalGeneratedLink(""); // Reset locale

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
      }
    } catch (error) {
      console.error("Errore durante la cancellazione del link:", error.message);
    }
  };

  // Funzione per aprire la Dialog di conferma
  const handleDeleteClick = () => {
    setOpenConfirmDialog(true);
  };

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
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <GenerateLinkButton
        onClick={generateRandomLink}
        isDisabled={localGeneratedLink !== ""}
      />
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {/* Campo di copia del link */}
        <CopyLinkField link={localGeneratedLink} onCopy={copyToClipboard} />
        {/* Icona Delete */}
        <IconButton
          onClick={handleDeleteClick}
          disabled={!localGeneratedLink}
          aria-label={t("delete_link")}
          sx={{
            color: "error.main",
          }}>
          <DeleteIcon />
        </IconButton>
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
          <Button onClick={handleCloseDialog} color="primary">
            {t("cancel")}
          </Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            {t("delete")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ShortLinkManager;
