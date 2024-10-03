// src/components/customComponents/CopyLinkField.js
import React, { useState } from "react";
import { Box, TextField, IconButton, Tooltip } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Icona che possiamo usare dopo la copia
import { useTranslation } from "react-i18next"; // Per le traduzioni
import { pxToRem } from "../../utils/pxToRem"; // Importa la funzione pxToRem

const CopyLinkField = ({ link, onCopy }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false); // Stato per il Tooltip
  const [isCopied, setIsCopied] = useState(false); // Stato per gestire il cambiamento di icona
  const { t } = useTranslation(); // Per gestire le traduzioni

  // Gestisco il click per copiare il link e mostro il tooltip
  const handleCopyClick = () => {
    onCopy(); // Eseguo la funzione di copia
    setIsCopied(true); // Aggiorno lo stato a "copiato"
    setTooltipOpen(true); // Mostro il tooltip

    // Nascondo il tooltip dopo 1.5 secondi
    setTimeout(() => {
      setTooltipOpen(false);
    }, 1500);

    // Ripristino l'icona standard dopo 3 secondi
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: pxToRem(8) }}>
      <TextField
        variant="outlined"
        value={link} // Mostro il link generato
        InputProps={{ readOnly: true }} // Imposto il campo come readonly per evitare modifiche
        sx={{ fontSize: pxToRem(16), padding: pxToRem(10) }} // Converto le dimensioni in rem per migliorare la reattività
      />
      <Tooltip
        title={t("linkCopied")} // Traduzione del testo del tooltip
        open={tooltipOpen} // Controllo la visibilità del tooltip
        disableHoverListener // Disabilito il comportamento predefinito di apertura al passaggio del mouse
        sx={{ fontSize: pxToRem(14) }} // Applico la conversione per il font-size
      >
        <IconButton onClick={handleCopyClick} sx={{ fontSize: pxToRem(24) }}>
          {/* Cambio l'icona in base allo stato "copiato" */}
          {isCopied ? (
            <CheckCircleIcon
              style={{ color: "green", fontSize: pxToRem(24) }}
            /> // Icona verde di conferma
          ) : (
            <ContentCopyIcon style={{ fontSize: pxToRem(24) }} /> // Icona standard per copiare
          )}
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default CopyLinkField;
