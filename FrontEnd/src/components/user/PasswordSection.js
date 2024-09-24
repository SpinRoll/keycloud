import React, { useState, useEffect } from "react";
import { Box, Typography, TextField } from "@mui/material"; // Uso il componente TextField di MUI
import { pxToRem } from "../../utils/pxToRem";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import CustomButton from "../customComponents/CustomButton";
import InfoModal from "../modals/InfoModal";
import axios from "axios";

const PasswordSection = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [profileData, setProfileData] = useState({
    nome: "",
    cognome: "",
    email: "",
  });

  // Funzione per aprire la modale
  const openModal = (message) => {
    setDialogMessage(message);
    setOpenDialog(true);
  };

  // Funzione per chiudere la modale
  const handleClose = () => {
    setOpenDialog(false);
  };

  // URL dell'API
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  // Funzione per ottenere i dati del profilo
  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/user/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Invia il token JWT
        },
      });
      setProfileData(response.data);
    } catch (error) {
      console.error("Errore nel recupero del profilo:", error);
      openModal(t("error_retrieving_profile_data"));
    } finally {
      setLoading(false);
    }
  };

  // Effettua il caricamento dei dati del profilo al montaggio del componente
  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line
  }, []);

  // Funzione per inviare la richiesta di aggiornamento password
  const handleChangePassword = async (e) => {
    e.preventDefault(); // Previene il comportamento predefinito del form
    if (newPassword !== confirmNewPassword) {
      openModal(t("new_passwords_not_match"));
      return;
    }

    setLoading(true);
    const userId = localStorage.getItem("userId");

    if (!userId) {
      openModal(
        "Impossibile ottenere l'ID dell'utente. Effettua nuovamente l'accesso."
      );
      setLoading(false);
      return;
    }

    try {
      await axios.put("/api/auth/change-password", {
        userId,
        currentPassword,
        newPassword,
      });

      openModal(t("password_reset_success"));
    } catch (error) {
      if (error.response && error.response.data.message) {
        openModal(t("actual_password_notsame"));
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
        {`${profileData.nome} ${profileData.cognome}`} > {t("password")}
      </Typography>
      <Typography
        variant="h3"
        sx={{ fontWeight: "bold", marginBottom: pxToRem(24) }}>
        {t("password")}
      </Typography>

      {/* Form per gestire il cambio di password */}
      <form onSubmit={handleChangePassword}>
        {/* Campo nascosto per l'email/nome utente */}
        <input
          type="hidden"
          name="email"
          value={profileData.email} // Utilizza l'email dell'utente come nome utente
          readOnly
        />

        {/* Campo per la password corrente */}
        <Box sx={{ marginBottom: pxToRem(16) }}>
          <TextField
            variant="outlined"
            type="password"
            fullWidth
            label={t("current_password")}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            autoComplete="current-password" // Attributo autocomplete per la password corrente
          />
        </Box>

        {/* Campo per la nuova password */}
        <Box sx={{ marginBottom: pxToRem(16) }}>
          <TextField
            variant="outlined"
            type="password"
            fullWidth
            label={t("new_password")}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            autoComplete="new-password" // Attributo autocomplete per la nuova password
          />
        </Box>

        {/* Campo per confermare la nuova password */}
        <Box sx={{ marginBottom: pxToRem(24) }}>
          <TextField
            variant="outlined"
            type="password"
            fullWidth
            label={t("new_password_again")}
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            autoComplete="new-password" // Attributo autocomplete per confermare la nuova password
          />
        </Box>

        {/* Bottone per salvare le modifiche */}
        <CustomButton
          variant="contained"
          color="primary"
          type="submit" // Aggiungi il type submit per il pulsante
          disabled={loading}>
          {t("save")}
        </CustomButton>
      </form>

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
