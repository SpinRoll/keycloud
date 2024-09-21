import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, Typography, Box } from "@mui/material";

const VerifyMFA = () => {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleVerifyMFA = async () => {
    setMessage("");
    setError("");
    try {
      // Richiesta al backend per verificare il codice MFA
      // eslint-disable-next-line
      const response = await axios.post(
        "/mfa/verify",
        { token: code },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Token JWT salvato nel localStorage
          },
        }
      );
      setMessage("MFA verificato con successo!");
    } catch (err) {
      setError("Codice MFA non valido.");
    }
  };

  return (
    <Box>
      <Typography variant="h6">Verifica il codice MFA</Typography>

      <TextField
        label="Inserisci codice MFA"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        variant="outlined"
        fullWidth
        margin="normal"
      />

      <Button variant="contained" color="primary" onClick={handleVerifyMFA}>
        Verifica MFA
      </Button>

      {message && <Typography color="primary">{message}</Typography>}
      {error && <Typography color="error">{error}</Typography>}
    </Box>
  );
};

export default VerifyMFA;
