// src/components/user/PasswordSection.js
import React from "react";
import { Box, Typography, TextField } from "@mui/material"; // Importo i componenti Material-UI necessari
import { pxToRem } from "../../utils/pxToRem"; // Importo la funzione pxToRem per convertire px in rem
import { useTheme } from "@mui/material/styles"; // Uso il tema corrente
import { useTranslation } from "react-i18next"; // Importo il hook useTranslation
import CustomButton from "../customComponents/CustomButton"; // Importo il bottone personalizzato

const PasswordSection = () => {
  const theme = useTheme(); // Uso il tema corrente
  const { t } = useTranslation(); // Uso la funzione di traduzione

  return (
    <Box>
      {/* Titolo e breadcrumb per la navigazione */}
      <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
        {t("my_account")} &gt; {t("password")}
      </Typography>
      <Typography
        variant="h3"
        sx={{ fontWeight: "bold", marginBottom: pxToRem(24) }}>
        {t("password")}
      </Typography>

      {/* Campo di input per la password corrente */}
      <Box sx={{ marginBottom: pxToRem(16) }}>
        <Typography
          variant="subtitle1"
          sx={{ color: theme.palette.text.primary, marginBottom: pxToRem(8) }}>
          {t("current_password")}
        </Typography>
        <TextField
          variant="outlined"
          type="password"
          fullWidth
          placeholder={t("current_password")}
        />
      </Box>

      {/* Campo di input per la nuova password */}
      <Box sx={{ marginBottom: pxToRem(16) }}>
        <Typography
          variant="subtitle1"
          sx={{ color: theme.palette.text.primary, marginBottom: pxToRem(8) }}>
          {t("new_password")}
        </Typography>
        <TextField
          variant="outlined"
          type="password"
          fullWidth
          placeholder={t("new_password")}
        />
      </Box>

      {/* Campo di input per la conferma della nuova password */}
      <Box sx={{ marginBottom: pxToRem(24) }}>
        <Typography
          variant="subtitle1"
          sx={{ color: theme.palette.text.primary, marginBottom: pxToRem(8) }}>
          {t("new_password_again")}
        </Typography>
        <TextField
          variant="outlined"
          type="password"
          fullWidth
          placeholder={t("new_password_again")}
        />
      </Box>

      {/* Bottone per salvare le modifiche */}
      <CustomButton variant="contained" color="primary">
        {t("save")}
      </CustomButton>
    </Box>
  );
};

export default PasswordSection;
