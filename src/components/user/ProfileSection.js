import React from "react";
import { Box, Typography, TextField, Button, Avatar } from "@mui/material";
import { pxToRem } from "../../utils/pxToRem";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import CustomButton from "../customComponents/CustomButton";

const ProfileSection = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Box>
      <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
        {t("my_account")} &gt; {t("profile")}
      </Typography>
      <Typography
        variant="h3"
        sx={{ fontWeight: "bold", marginBottom: pxToRem(24) }}>
        {t("profile")}
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: pxToRem(24),
        }}>
        <Avatar
          sx={{
            width: pxToRem(60),
            height: pxToRem(60),
            marginRight: pxToRem(16),
          }}>
          L
        </Avatar>
        <Button variant="outlined" sx={{ color: theme.palette.primary.main }}>
          {t("upload_new_pic")}
        </Button>
      </Box>

      <Box sx={{ marginBottom: pxToRem(16) }}>
        <Typography
          variant="subtitle1"
          sx={{ color: theme.palette.text.primary, marginBottom: pxToRem(8) }}>
          {t("username")}
        </Typography>
        <TextField variant="outlined" fullWidth defaultValue="Nome" />
      </Box>

      <Box sx={{ marginBottom: pxToRem(16) }}>
        <Typography
          variant="subtitle1"
          sx={{ color: theme.palette.text.primary, marginBottom: pxToRem(8) }}>
          {t("email_address")}
        </Typography>
        <TextField variant="outlined" fullWidth defaultValue="email" />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <CustomButton
          variant="contained"
          color="primary"
          sx={{ width: "auto" }}>
          {t("save")}
        </CustomButton>

        <CustomButton
          variant="outlined"
          sx={{
            width: "auto",
            color: theme.colors.red,
            borderColor: theme.colors.red,
            "&:hover": {
              backgroundColor: theme.colors.lightRed,
              borderColor: theme.colors.lightRed,
              color: theme.colors.red,
            },
          }}>
          {t("logout")}
        </CustomButton>
      </Box>
    </Box>
  );
};

export default ProfileSection;
