// src/components/customComponents/ActionButtons.js
import React from "react";
import CustomButton from "./CustomButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

const ActionButtons = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <>
      <CustomButton variant="contained" color="primary">
        {t("save")}
      </CustomButton>

      <CustomButton variant="outlined" color="primary">
        {t("edit")}
      </CustomButton>

      <CustomButton
        variant="outlined"
        sx={{
          color: theme.colors.red,
          borderColor: theme.colors.red,
          "&:hover": {
            backgroundColor: theme.colors.lightRed,
            borderColor: theme.colors.lightRed,
            color: theme.colors.red,
          },
        }}
        startIcon={<DeleteIcon />}>
        {t("delete_apartment")}
      </CustomButton>
    </>
  );
};

export default ActionButtons;
