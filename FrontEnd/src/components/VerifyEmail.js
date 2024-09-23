// src/components/VerifyEmail.js
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import InfoModal from ".././components/modals/InfoModal";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import LoadingSpinner from "./customComponents/LoadingSpinner";
import { pxToRem } from "../utils/pxToRem";

const VerifyEmail = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  // Funzione per chiudere la modale
  const handleClose = () => {
    setOpenDialog(false);
    navigate("/user-page");
  };

  const verifyEmail = async () => {
    const token = new URLSearchParams(location.search).get("token");

    try {
      await axios.put(`/api/user/verify-email?token=${token}`);
      setDialogMessage(t('success_email_changed'));
      setOpenDialog(true);
    } catch (error) {
      console.error("t('error_email_change')", error);
      setDialogMessage(t('error_email_change'));
      setOpenDialog(true);
    }
  };

  useEffect(() => {
    verifyEmail();
    // eslint-disable-next-line
  }, []);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          gap: pxToRem(8),
        }}
      >
        <LoadingSpinner size={20} />
        {t('verify_email')}
      </Box>
      {/* Usa il componente InfoModal */}
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

export default VerifyEmail;
