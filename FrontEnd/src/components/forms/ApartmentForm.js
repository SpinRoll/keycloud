// components/forms/ApartmentForm.js
import React from "react";
import { Box } from "@mui/material";
import CustomTextField from "../customComponents/CustomTextField";
import CustomButton from "../customComponents/CustomButton";
import { useTranslation } from "react-i18next";
import HomeIcon from "@mui/icons-material/Home";
import { pxToRem } from "../../utils/pxToRem";

const ApartmentForm = ({ formValues, handleChange, handleSave }) => {
  const { t } = useTranslation();

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <HomeIcon sx={{ width: pxToRem(40), height: pxToRem(40) }} />
      </Box>

      <CustomTextField
        label={t("name")}
        variant="outlined"
        fullWidth
        name="nome"
        value={formValues.nome}
        onChange={handleChange}
      />

      <Box sx={{ display: "flex", gap: pxToRem(8), width: "100%" }}>
        <CustomTextField
          label={t("street")}
          variant="outlined"
          fullWidth
          name="via"
          value={formValues.via}
          onChange={handleChange}
        />
        <CustomTextField
          label={t("number")}
          variant="outlined"
          fullWidth
          name="numero"
          value={formValues.numero}
          onChange={handleChange}
        />
      </Box>

      <CustomTextField
        label={t("floor_staircase")}
        variant="outlined"
        fullWidth
        name="piano_scala"
        value={formValues.piano_scala}
        onChange={handleChange}
      />

      <CustomTextField
        label={t("city")}
        variant="outlined"
        fullWidth
        name="citta"
        value={formValues.citta}
        onChange={handleChange}
      />

      <CustomTextField
        label={t("postal_code")}
        variant="outlined"
        fullWidth
        name="cap"
        value={formValues.cap}
        onChange={handleChange}
      />

      <Box sx={{ display: "flex", gap: pxToRem(8), width: "100%" }}>
        <CustomTextField
          label={t("prefix")}
          variant="outlined"
          fullWidth
          name="prefisso"
          value={formValues.prefisso}
          onChange={handleChange}
          sx={{ flex: 1 }}
        />
        <CustomTextField
          label={t("phone")}
          variant="outlined"
          fullWidth
          name="telefono"
          value={formValues.telefono}
          onChange={handleChange}
          sx={{ flex: 3 }}
        />
      </Box>

      <CustomButton variant="contained" onClick={handleSave}>
        {t("save")}
      </CustomButton>
    </>
  );
};

export default ApartmentForm;
