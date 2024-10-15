// components/modals/DeleteConfirmationModal.js
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
} from "@mui/material";
import { pxToRem } from "../../utils/pxToRem";
import { useTranslation } from "react-i18next";

const DeleteConfirmationModal = ({
  open,
  onClose,
  onConfirm,
  apartmentName,
}) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ fontSize: pxToRem(20), textAlign: "center" }}>
        {t("delete_apartment")}
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          {t("delete_confirmation_message", { name: apartmentName })}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t("no")}</Button>
        <Button onClick={onConfirm} color="error">
          {t("yes")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
