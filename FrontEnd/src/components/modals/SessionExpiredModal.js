// src/components/modals/SessionExpiredModal.js
import React, { useContext } from "react";
import { SessionContext } from "../../context/SessionContext";
import { Modal, Box, Typography, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { pxToRem } from "../../utils/pxToRem";

const SessionExpiredModal = () => {
  const { isSessionExpired, setIsSessionExpired } = useContext(SessionContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClose = () => {
    // Clear session data
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userId");

    // Reset the session expired state
    setIsSessionExpired(false); // Close the modal

    // Redirect to sign-in page
    navigate("/sign-in");
  };

  return (
    <Modal width="100%" open={isSessionExpired} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxWidth: pxToRem(400),
          bgcolor: "background.paper",
          padding: pxToRem(20),
          borderRadius: pxToRem(8),
          boxShadow: `0px ${pxToRem(0)} ${pxToRem(10)} #635FC7`,
        }}>
        <Typography
          variant="h6"
          component="h2"
          sx={{ mb: 2, textAlign: "center" }}>
          {t("session_expired_please_login_again")}
        </Typography>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item>
            <Button variant="contained" onClick={handleClose}>
              {t("ok")}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default SessionExpiredModal;
