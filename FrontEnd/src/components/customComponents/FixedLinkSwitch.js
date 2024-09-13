// src/components/customComponents/FixedLinkSwitch.js
import React from "react";
import { FormControlLabel, Switch } from "@mui/material";
import { useTranslation } from "react-i18next";

const FixedLinkSwitch = ({ isFixedLink, onChange }) => {
  const { t } = useTranslation();

  return (
    <FormControlLabel
      control={
        <Switch color="primary" checked={isFixedLink} onChange={onChange} />
      }
      label={t("fixed_link")}
    />
  );
};

export default FixedLinkSwitch;
