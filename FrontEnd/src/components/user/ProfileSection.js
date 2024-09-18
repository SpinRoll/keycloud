import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, Button, Avatar } from "@mui/material";
import { pxToRem } from "../../utils/pxToRem";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import CustomButton from "../customComponents/CustomButton";
import axios from "axios"; // Importa axios per le chiamate API

const ProfileSection = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [profileData, setProfileData] = useState({
    nome: "",
    cognome: "",
    email: "",
  }); // Stato per i dati del profilo
  const [loading, setLoading] = useState(false); // Stato per il caricamento

  // Funzione per ottenere i dati del profilo
  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/user/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Invia il token JWT
        },
      });
      setProfileData(response.data);
    } catch (error) {
      console.error("Errore nel recupero del profilo:", error);
    } finally {
      setLoading(false);
    }
  };

  // Funzione per aggiornare i dati del profilo
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
      alert("Profilo aggiornato con successo!");
    } catch (error) {
      console.error("Errore durante l'aggiornamento del profilo:", error);
    } finally {
      setLoading(false);
    }
  };

  // Usa useEffect per chiamare l'API quando il componente viene montato
  useEffect(() => {
    fetchProfile();
  }, []);

  // Funzione per ottenere le iniziali del nome e cognome
  const getInitials = () => {
    const nomeInitial = profileData.nome ? profileData.nome[0].toUpperCase() : "";
    const cognomeInitial = profileData.cognome ? profileData.cognome[0].toUpperCase() : "";
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
        {t("my_account")} &gt; {t("profile")}
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
          }}
        >
          {getInitials()} {/* Visualizza le iniziali del nome e cognome */}
        </Avatar>
        {/* <Button variant="outlined" sx={{ color: theme.palette.primary.main }}>
          {t("upload_new_pic")}
        </Button> */}
      </Box>
      <Box sx={{ display: "flex", gap: pxToRem(8), width: "100%" }}>
        {/* Campo per il Nome */}
        <Box sx={{ marginBottom: pxToRem(16) }}>
          <Typography
            variant="subtitle1"
            sx={{ color: theme.palette.text.primary, marginBottom: pxToRem(8) }}>
            {t("nome")}
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            name="nome"
            value={profileData.nome} // Usa i dati del nome nello stato
            onChange={handleInputChange} // Aggiorna lo stato quando l'utente modifica il campo
          />
        </Box>

        {/* Campo per il Cognome */}
        <Box sx={{ marginBottom: pxToRem(16) }}>
          <Typography
            variant="subtitle1"
            sx={{ color: theme.palette.text.primary, marginBottom: pxToRem(8) }}>
            {t("cognome")}
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            name="cognome"
            value={profileData.cognome} // Usa i dati del cognome nello stato
            onChange={handleInputChange} // Aggiorna lo stato quando l'utente modifica il campo
          />
        </Box>
      </Box>

      {/* Campo per l'Email */}
      <Box sx={{ marginBottom: pxToRem(16) }}>
        <Typography
          variant="subtitle1"
          sx={{ color: theme.palette.text.primary, marginBottom: pxToRem(8) }}>
          {t("email_address")}
        </Typography>
        <TextField
          variant="outlined"
          fullWidth
          name="email"
          value={profileData.email} // Usa i dati dell'email nello stato
          onChange={handleInputChange} // Aggiorna lo stato quando l'utente modifica il campo
        />
      </Box>

      {/* Bottoni di salvataggio */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <CustomButton
          variant="contained"
          color="primary"
          sx={{ width: "auto" }}
          onClick={updateProfile} // Salva il profilo quando viene premuto il pulsante
        >
          {loading ? t("loading") : t("save")}
        </CustomButton>

        <CustomButton
          variant="outlined"
          sx={{
            width: "auto",
            color: theme.colors.red,
            borderColor: theme.colors.red,
            "&:hover": {
              backgroundColor: theme.colors.lightRed,
              borderColor: theme.colors.lightRed,
              color: theme.colors.red,
            },
          }}>
          {t("logout")}
        </CustomButton>
      </Box>
    </Box>
  );
};

export default ProfileSection;
