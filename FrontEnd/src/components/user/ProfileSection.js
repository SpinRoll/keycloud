import React, { useEffect, useState } from "react";
import { Box, Typography, Avatar } from "@mui/material";
import { pxToRem } from "../../utils/pxToRem";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import CustomButton from "../customComponents/CustomButton";
import InfoModal from "../modals/InfoModal";
import CustomTextField from "../customComponents/CustomTextField";
import LoadingSpinner from "../customComponents/LoadingSpinner";

import axios from "axios"; // Importa axios per le chiamate API

const ProfileSection = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [profileData, setProfileData] = useState({
    nome: "",
    cognome: "",
    email: "",
  }); // Stato per i dati del profilo
  const [loading, setLoading] = useState(false); // Stato per il caricamento generale
  const [emailChangeLoading, setEmailChangeLoading] = useState(false); // Stato per il cambio email
  const [openDialog, setOpenDialog] = useState(false); // Stato per la modale
  const [dialogMessage, setDialogMessage] = useState(""); // Stato per il messaggio della modale
  const [lastRequestedEmail, setLastRequestedEmail] = useState(null); // Stato per controllare l'ultima email richiesta

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
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000"; // URL API dinamico

  // Funzione per ottenere i dati del profilo
  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/user/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Invia il token JWT
        },
      });
      setProfileData(response.data); // Imposta i dati del profilo
    } catch (error) {
      console.error("Errore nel recupero del profilo:", error);
    } finally {
      setLoading(false);
    }
  };

  // Funzione per aggiornare Nome e Cognome
  const updateProfile = async () => {
    setLoading(true);
    try {
      // eslint-disable-next-line
      const response = await axios.put(
        "/api/user/profile",
        {
          nome: profileData.nome,
          cognome: profileData.cognome, // Aggiungi anche il cognome qui
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Invia il token JWT
          },
        }
      );
      openModal(t("success_profile_updated"));
    } catch (error) {
      console.error(t("error_profile_update"), error);
      openModal(t("error_profile_update"));
    } finally {
      setLoading(false);
    }
  };

  // Funzione per inviare la richiesta di cambio email
  const updateEmail = async () => {
    // Controlla se l'email è già stata richiesta
    if (lastRequestedEmail === profileData.email) {
      openModal(t("email_already_sent"));
      return;
    }

    setEmailChangeLoading(true);
    try {
      // Richiesta API per cambiare l'email
      await axios.put(
        "/api/user/change-email",
        { newEmail: profileData.email },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // Aggiorna lo stato dell'ultima email richiesta
      setLastRequestedEmail(profileData.email);
      openModal(t("verify_email_sent"));
    } catch (error) {
      console.error(t("error_email_change"), error);
      openModal(t("error_email_change"));
    } finally {
      setEmailChangeLoading(false);
    }
  };

  // Usa useEffect per chiamare l'API quando il componente viene montato
  useEffect(() => {
    fetchProfile();
  }, []);

  // Funzione per ottenere le iniziali del nome e cognome
  const getInitials = () => {
    const nomeInitial = profileData.nome
      ? profileData.nome[0].toUpperCase()
      : "";
    const cognomeInitial = profileData.cognome
      ? profileData.cognome[0].toUpperCase()
      : "";
    return `${nomeInitial}${cognomeInitial}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
        {`${profileData.nome} ${profileData.cognome}`} &gt; {t("profile")}
      </Typography>
      <Typography
        variant="h3"
        sx={{ fontWeight: "bold", marginBottom: pxToRem(24) }}>
        {t("profile")}
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: pxToRem(24),
        }}>
        <Avatar
          sx={{
            width: pxToRem(60),
            height: pxToRem(60),
            marginRight: pxToRem(16),
            backgroundColor: theme.palette.secondary.main,
          }}>
          {getInitials()} {/* Visualizza le iniziali del nome e cognome */}
        </Avatar>
      </Box>

      <Box sx={{ display: "flex", gap: pxToRem(8), width: "100%" }}>
        {/* Campo per il Nome */}
        <Box sx={{ marginBottom: pxToRem(16) }}>
          <CustomTextField
            variant="outlined"
            label={t("name")}
            fullWidth
            name="nome"
            value={profileData.nome} // Usa i dati del nome nello stato
            onChange={handleInputChange} // Aggiorna lo stato quando l'utente modifica il campo
          />
        </Box>

        {/* Campo per il Cognome */}
        <Box sx={{ marginBottom: pxToRem(16) }}>
          <CustomTextField
            variant="outlined"
            label={t("surname")}
            fullWidth
            name="cognome"
            value={profileData.cognome} // Usa i dati del cognome nello stato
            onChange={handleInputChange} // Aggiorna lo stato quando l'utente modifica il campo
          />
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: pxToRem(8), width: "100%" }}>
        {/* Campo per l'Email */}
        <Box sx={{ marginBottom: pxToRem(16), flex: 2 }}>
          <CustomTextField
            label={t("email_address")}
            variant="outlined"
            sx={{ width: "100%" }}
            name="email"
            value={profileData.email} // Usa i dati dell'email nello stato
            onChange={handleInputChange} // Aggiorna lo stato quando l'utente modifica il campo
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: pxToRem(8),
          }}>
          {/* Bottone per inviare la richiesta di cambio email */}
          <CustomButton
            variant="contained"
            color="secondary"
            sx={{
              width: "auto",
              padding: `${pxToRem(15.76)} ${pxToRem(16)}`,
            }}
            onClick={updateEmail} // Salva il cambio email
            disabled={emailChangeLoading} // Disabilita il bottone durante il caricamento
          >
            {emailChangeLoading ? (
              <LoadingSpinner size={20} />
            ) : (
              t("change_email")
            )}
          </CustomButton>
        </Box>
      </Box>

      {/* Bottoni di salvataggio */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: pxToRem(8),
        }}>
        {/* Bottone per aggiornare Nome e Cognome */}
        <CustomButton
          variant="contained"
          color="primary"
          sx={{ width: "auto" }}
          onClick={updateProfile} // Salva il profilo quando viene premuto il pulsante
          disabled={loading} // Disabilita il bottone durante il caricamento
        >
          {loading ? <LoadingSpinner size={20} /> : t("save")}
        </CustomButton>
      </Box>

      {/* Modale per mostrare i messaggi */}
      <InfoModal
        open={openDialog}
        onClose={handleClose}
        dialogMessage={dialogMessage}
        theme={theme}
        t={t}
      />
    </Box>
  );
};

export default ProfileSection;
