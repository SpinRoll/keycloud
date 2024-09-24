import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Box, Switch, FormControlLabel } from "@mui/material";
import InfoModal from "../modals/InfoModal";
import LoadingSpinner from "../customComponents/LoadingSpinner";
import CustomButton from "../customComponents/CustomButton";
import CustomTextField from "../customComponents/CustomTextField";
import { useTranslation } from "react-i18next"; // Importa il hook per le traduzioni

const TwoFactorSetup = () => {
  const { t } = useTranslation(); // Usa il hook per tradurre le chiavi
  const [qrCode, setQrCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mfaCode, setMfaCode] = useState(""); // Codice MFA inserito dall'utente
  const [verified, setVerified] = useState(false); // Stato per gestire la verifica MFA
  const [modalOpen, setModalOpen] = useState(false); // Stato per gestire l'apertura del modale
  const [dialogMessage, setDialogMessage] = useState(""); // Messaggio da passare alla modale
  const [mfaEnabled, setMfaEnabled] = useState(false); // Stato MFA attivo

  // Funzione per aprire la modale
  const handleOpenModal = (message) => {
    setDialogMessage(message);
    setModalOpen(true);
  };

  // Funzione per chiudere la modale
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // URL dell'API
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000"; // URL API dinamico

  // Funzione per abilitare MFA
  const handleEnableMFA = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token"); // Recupera il token JWT

      const response = await axios.post(
        `${API_URL}/api/auth/mfa/setup`, // URL API dinamico
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Invia il token JWT
          },
        }
      );

      setQrCode(response.data.qrCode); // Mostra il QR code
      handleOpenModal(t("qr_code_success")); // Usa la traduzione per il messaggio di successo
    } catch (err) {
      handleOpenModal(t("mfa_setup_error")); // Usa la traduzione per l'errore
    } finally {
      setLoading(false);
    }
  };

  // Funzione per disabilitare MFA
  const handleDisableMFA = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${API_URL}/api/auth/mfa/disable`, // Endpoint per disabilitare l'MFA
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Invia il token JWT
          },
        }
      );

      setMfaEnabled(false); // Aggiorna lo stato dell'MFA a false
      handleOpenModal(t("mfa_disabled_success"));
    } catch (err) {
      handleOpenModal(t("mfa_disable_error"));
    } finally {
      setLoading(false);
    }
  };

  // Funzione per verificare il codice MFA
  const handleVerifyMFA = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token"); // Recupera il token JWT

      const response = await axios.post(
        `${API_URL}/api/auth/mfa/verify`,
        {
          token: mfaCode, // Invia il codice MFA al backend
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Invia il token JWT
          },
        }
      );

      if (response.data.message === "MFA verificato con successo!") {
        setVerified(true);
        handleOpenModal(t("mfa_verified_success"));
        setMfaEnabled(true); // Aggiorna lo stato dell'MFA a true dopo la verifica
      } else {
        handleOpenModal(t("mfa_verify_error"));
      }
    } catch (err) {
      handleOpenModal(t("mfa_verification_error"));
    } finally {
      setLoading(false);
    }
  };

  // Funzione per gestire il cambio dello switch
  const handleMfaToggle = async () => {
    if (mfaEnabled) {
      await handleDisableMFA();
    } else {
      await handleEnableMFA();
    }
  };

  // Funzione per controllare lo stato MFA dell'utente
  const checkMfaStatus = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token"); // Recupera il token JWT

      const response = await axios.get(
        `${API_URL}/api/auth/mfa/status`, // Endpoint per ottenere lo status dell'MFA
        {
          headers: {
            Authorization: `Bearer ${token}`, // Invia il token JWT
          },
        }
      );

      setMfaEnabled(response.data.mfaEnabled); // Imposta lo stato MFA in base alla risposta
    } catch (err) {
      console.error("Errore durante il controllo dello stato MFA:", err);
    } finally {
      setLoading(false);
    }
  };

  // Effettua il controllo dello stato MFA al caricamento della pagina
  useEffect(() => {
    checkMfaStatus();
    // eslint-disable-next-line
  }, []);

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        {t("two_factor_auth_title")}
      </Typography>

      {!qrCode && (
        <Box>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {t("two_factor_auth_description")}
          </Typography>

          {/* Switch per abilitare/disabilitare MFA */}
          <FormControlLabel
            control={
              <Switch
                checked={mfaEnabled}
                onChange={handleMfaToggle}
                disabled={loading} // Disabilita lo switch durante il caricamento
              />
            }
            label={
              mfaEnabled ? t("enabled_mfa_label") : t("disabled_mfa_label")
            }
          />
        </Box>
      )}

      {qrCode && !verified && (
        <Box>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {t("qr_code_success")}
          </Typography>
          <img src={qrCode} alt="QR Code" />

          <CustomTextField
            label={t("mfa_code_label")}
            value={mfaCode}
            onChange={(e) => setMfaCode(e.target.value)}
            fullWidth
            margin="normal"
            error={!!error} // Colore del bordo rosso se c'è un errore
          />

          <CustomButton
            variant="contained"
            color="primary"
            onClick={handleVerifyMFA}
            disabled={loading || !mfaCode}>
            {loading ? <LoadingSpinner size={20} /> : t("verify_mfa_button")}
          </CustomButton>
        </Box>
      )}

      {verified && (
        <Typography color="primary" variant="h6">
          {t("mfa_verified_success")}
        </Typography>
      )}

      {/* Modal per messaggi */}
      <InfoModal
        open={modalOpen}
        onClose={handleCloseModal}
        dialogMessage={dialogMessage}
      />
    </Box>
  );
};

export default TwoFactorSetup;
