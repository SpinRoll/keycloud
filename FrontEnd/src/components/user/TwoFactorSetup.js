import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Typography,
  Box,
  CircularProgress,
  TextField,
} from "@mui/material";

const TwoFactorSetup = () => {
  const [qrCode, setQrCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mfaCode, setMfaCode] = useState(""); // Aggiungi uno stato per il codice MFA
  const [verified, setVerified] = useState(false); // Stato per gestire la verifica MFA

  // Funzione per abilitare MFA
  const handleEnableMFA = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token"); // Recupera il token JWT

      const response = await axios.post(
        "http://localhost:5000/api/auth/mfa/setup",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setQrCode(response.data.qrCode); // Visualizza il QR code
    } catch (err) {
      console.error("Errore durante la richiesta MFA:", err);
      setError("Errore durante l'abilitazione MFA.");
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
        "http://localhost:5000/api/auth/mfa/verify",
        {
          token: mfaCode, // Invia il codice MFA al backend
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.message === "MFA verificato con successo!") {
        setVerified(true);
      }
    } catch (err) {
      console.error("Errore durante la verifica MFA:", err);
      setError("Codice MFA non valido.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Impostazioni autenticazione a due fattori (MFA)
      </Typography>

      {!qrCode && (
        <Box>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Abilita l'autenticazione a due fattori per aumentare la sicurezza
            del tuo account.
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={handleEnableMFA}
            disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Abilita MFA"}
          </Button>

          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
        </Box>
      )}

      {qrCode && !verified && (
        <Box>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Scansiona questo codice QR con la tua app di autenticazione:
          </Typography>
          <img src={qrCode} alt="QR Code" />

          <TextField
            label="Codice MFA"
            value={mfaCode}
            onChange={(e) => setMfaCode(e.target.value)}
            fullWidth
            margin="normal"
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleVerifyMFA}
            disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Verifica MFA"}
          </Button>

          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
        </Box>
      )}

      {verified && (
        <Typography color="primary" variant="h6">
          MFA verificato con successo!
        </Typography>
      )}
    </Box>
  );
};

export default TwoFactorSetup;
