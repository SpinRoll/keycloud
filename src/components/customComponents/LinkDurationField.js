// src/components/customComponents/LinkDurationField.js
import React from "react";
import CustomTextField from "./CustomTextField";
import { useTranslation } from "react-i18next";

const LinkDurationField = ({ linkDuration }) => {
  const { t } = useTranslation();

  return (
    <CustomTextField
      label={t("link_duration")}
      variant="outlined"
      value={linkDuration}
      InputProps={{
        readOnly: true,
      }}
    />
  );
};

export default LinkDurationField;
