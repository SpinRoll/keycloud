import React from "react";
import { Snackbar, SnackbarContent, Box } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Icona di successo
import WarningIcon from "@mui/icons-material/Warning"; // Icona di errore
import { pxToRem } from "../../utils/pxToRem"; // Funzione per la conversione in rem
import { useTranslation } from "react-i18next"; // Importa useTranslation

const SnackBarSuccess = ({
  open,
  onClose,
  messageKey,
  severity = "success",
}) => {
  const { t } = useTranslation(); // Usa la traduzione

  // Se il messaggio è di tipo "success" o "error", cambia icona e colore
  const icon =
    severity === "success" ? (
      <CheckCircleIcon
        sx={{
          color: "green",
          fontSize: pxToRem(24),
          marginRight: pxToRem(8),
        }}
      />
    ) : (
      <WarningIcon
        sx={{
          color: "orange",
          fontSize: pxToRem(24),
          marginRight: pxToRem(8),
        }}
      />
    );

  const message = t(messageKey);

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000} // Durata dello snackbar in millisecondi
      onClose={onClose}>
      <SnackbarContent
        message={
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {icon} {/* Mostra l'icona dinamica */}
            {message} {/* Messaggio tradotto */}
          </Box>
        }
      />
    </Snackbar>
  );
};

export default SnackBarSuccess;
