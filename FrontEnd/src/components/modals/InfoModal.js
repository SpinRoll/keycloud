// src/components/modals/InfoModal.js
import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info"; // Icona di info
import WarningIcon from "@mui/icons-material/Warning"; // Icona di warning
import CustomButton from "../customComponents/CustomButton"; // Importa il bottone personalizzato
import { pxToRem } from "../../utils/pxToRem"; // Funzione per la conversione delle unità
import { useTranslation } from "react-i18next"; // Hook per le traduzioni
import { useTheme } from "@mui/material/styles"; // Hook per il tema

const InfoModal = ({ open, onClose, dialogMessage, userName, userSurname }) => {
  // Aggiunto nome e cognome
  const { t } = useTranslation(); // Traduzioni
  const theme = useTheme(); // Tema

  // Funzione unificata per determinare icona e titolo
  const renderIconAndTitle = () => {
    // Se il messaggio è relativo al successo del SignIn
    if (dialogMessage === t("signin_success")) {
      return {
        icon: (
          <InfoIcon
            sx={{ fontSize: pxToRem(32), color: theme.palette.success.main }}
          />
        ),
        title: `${t("welcome")}, ${userName} ${userSurname}!`, // Titolo "Benvenuto" personalizzato
      };
    }
    // Se il messaggio è relativo al successo del SignUp
    else if (dialogMessage === t("signup_success")) {
      return {
        icon: (
          <InfoIcon
            sx={{ fontSize: pxToRem(32), color: theme.palette.success.main }}
          />
        ),
        title: `${t("signup_success_title")}, ${userName} ${userSurname}!`, // Titolo personalizzato per SignUp
      };
    }
    // Condizioni per messaggi di warning
    else if (
      dialogMessage === t("error_email_change") ||
      dialogMessage === t("error_profile_update") ||
      dialogMessage === t("email_already_sent") ||
      dialogMessage === t("mfa_setup_error") ||
      dialogMessage === t("mfa_verification_error") ||
      dialogMessage === t("mfa_verify_error") ||
      dialogMessage === t("actual_password_notsame") ||
      dialogMessage === t("new_passwords_not_match") ||
      dialogMessage === t("error_retrieving_profile_data")
    ) {
      return {
        icon: (
          <WarningIcon
            sx={{ fontSize: pxToRem(32), color: theme.palette.warning.main }}
          />
        ),
        title: t("warning"), // Titolo warning per errori
      };
    }
    // Condizioni di default
    else {
      return {
        icon: (
          <InfoIcon
            sx={{ fontSize: pxToRem(32), color: theme.palette.text.primary }}
          />
        ),
        title: t("notification"), // Titolo di default
      };
    }
  };

  // Estrai icona e titolo dalla funzione
  const { icon, title } = renderIconAndTitle();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle
        sx={{
          fontSize: pxToRem(32),
          fontWeight: "600",
          display: "flex",
          alignItems: "center",
          gap: pxToRem(8),
        }}>
        {icon} {/* Icona dinamica */}
        {title} {/* Titolo dinamico */}
      </DialogTitle>
      <DialogContent
        sx={{
          paddingBottom: `${pxToRem(8)}`,
        }}>
        <DialogContentText
          sx={{
            color: theme.palette.text.primary,
          }}
          id="alert-dialog-description">
          {dialogMessage}
        </DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: `${pxToRem(0)}`,
        }}>
        <CustomButton
          variant="contained"
          sx={{
            width: "auto",
            margin: `${pxToRem(16)}`,
            padding: `${pxToRem(8)} ${pxToRem(32)}`,
          }}
          onClick={onClose}
          autoFocus>
          {t("ok")}
        </CustomButton>
      </DialogActions>
    </Dialog>
  );
};

export default InfoModal;
