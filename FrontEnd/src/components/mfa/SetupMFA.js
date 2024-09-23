import React, { useState } from "react";
import axios from "axios";
import { Button, Typography, Box, CircularProgress } from "@mui/material";

const SetupMFA = () => {
  const [qrCode, setQrCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEnableMFA = async () => {
    setLoading(true);
    setError("");
    try {
      // Richiedi il QR code dal backend
      const response = await axios.post(
        "/mfa/setup",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Token JWT salvato nel localStorage
          },
        }
      );
      setQrCode(response.data.qrCode);
    } catch (err) {
      setError("Errore durante l'abilitazione MFA.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h6">
        Configura l'autenticazione a due fattori (MFA)
      </Typography>

      {loading && <CircularProgress />}

      {qrCode ? (
        <Box>
          <Typography>
            Scansiona questo codice QR con la tua app di autenticazione:
          </Typography>
          <img src={qrCode} alt="QR Code" />
        </Box>
      ) : (
        <Button variant="contained" color="primary" onClick={handleEnableMFA}>
          Abilita MFA
        </Button>
      )}

      {error && <Typography color="error">{error}</Typography>}
    </Box>
  );
};

export default SetupMFA;
