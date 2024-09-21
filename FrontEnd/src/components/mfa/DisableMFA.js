import React, { useState } from "react";
import axios from "axios";
import { Button, Typography, Box } from "@mui/material";

const DisableMFA = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleDisableMFA = async () => {
    setMessage("");
    setError("");
    try {
      // Richiesta al backend per disabilitare l'MFA
      // eslint-disable-next-line
      const response = await axios.post(
        "/mfa/disable",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Token JWT salvato nel localStorage
          },
        }
      );
      setMessage("MFA disabilitato con successo!");
    } catch (err) {
      setError("Errore durante la disabilitazione MFA.");
    }
  };

  return (
    <Box>
      <Typography variant="h6">
        Disabilita l'autenticazione a due fattori (MFA)
      </Typography>

      <Button variant="contained" color="secondary" onClick={handleDisableMFA}>
        Disabilita MFA
      </Button>

      {message && <Typography color="primary">{message}</Typography>}
      {error && <Typography color="error">{error}</Typography>}
    </Box>
  );
};

export default DisableMFA;
