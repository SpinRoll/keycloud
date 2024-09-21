import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { pxToRem } from "../../utils/pxToRem";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import CustomButton from "../customComponents/CustomButton";
import axios from "axios";
import InfoModal from "../modals/InfoModal";
import CustomTextField from "../customComponents/CustomTextField";

const PasswordSection = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  // Funzione per aprire la modale
  const openModal = (message) => {
    setDialogMessage(message);
    setOpenDialog(true);
  };

  // Funzione per chiudere la modale
  const handleClose = () => {
    setOpenDialog(false);
  };

  // Funzione per inviare la richiesta di aggiornamento password
  const handleChangePassword = async () => {
    // Controlli lato frontend
    if (newPassword !== confirmNewPassword) {
      openModal("Le nuove password non corrispondono");
      return;
    }

    setLoading(true);

    // Recupera l'ID utente dal localStorage
    const userId = localStorage.getItem("userId");
    if (!userId) {
      openModal(
        "Impossibile ottenere l'ID dell'utente. Effettua nuovamente l'accesso."
      );
      setLoading(false);
      return;
    }

    try {
      // Invia la richiesta di aggiornamento password
      // eslint-disable-next-line
      const response = await axios.put("/api/auth/change-password", {
        userId,
        currentPassword,
        newPassword,
      });

      openModal("Password aggiornata con successo");
    } catch (error) {
      if (error.response && error.response.data.message) {
        openModal(error.response.data.message);
      } else {
        openModal("Errore durante l'aggiornamento della password");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
        {t("my_account")} &gt; {t("password")}
      </Typography>
      <Typography
        variant="h3"
        sx={{ fontWeight: "bold", marginBottom: pxToRem(24) }}>
        {t("password")}
      </Typography>

      {/* Campo per la password corrente */}
      <Box sx={{ marginBottom: pxToRem(8) }}>
        <CustomTextField
          variant="outlined"
          type="password"
          fullWidth
          label={t("current_password")}
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </Box>

      {/* Campo per la nuova password */}
      <Box sx={{ marginBottom: pxToRem(8) }}>
        <CustomTextField
          variant="outlined"
          type="password"
          fullWidth
          label={t("new_password")}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </Box>

      {/* Campo per confermare la nuova password */}
      <Box sx={{ marginBottom: pxToRem(24) }}>
        <CustomTextField
          variant="outlined"
          type="password"
          fullWidth
          label={t("new_password_again")}
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
      </Box>

      {/* Bottone per salvare le modifiche */}
      <CustomButton
        variant="contained"
        color="primary"
        onClick={handleChangePassword}
        disabled={loading}>
        {t("save")}
      </CustomButton>

      {/* Modale per mostrare i messaggi */}
      <InfoModal
        open={openDialog}
        onClose={handleClose}
        dialogMessage={dialogMessage}
      />
    </Box>
  );
};

export default PasswordSection;
