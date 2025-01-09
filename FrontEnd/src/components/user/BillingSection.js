// src/components/user/BillingSection.js
import React from "react";
import { Box, Typography, Button, Divider } from "@mui/material";
import { pxToRem } from "../../utils/pxToRem";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PayPalIcon from "@mui/icons-material/AccountBalanceWallet"; // Sostituisci con l'icona corretta di PayPal

const BillingSection = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Box>
      {/* Titolo e breadcrumb dell'account */}
      {/* <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
        {t("my_account")} &gt; {t("billing")}
      </Typography> */}
      <Typography
        variant="h3"
        sx={{ fontWeight: "bold", marginBottom: pxToRem(24) }}>
        {t("billing")}
      </Typography>

      {/* Dettagli del piano di abbonamento */}
      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          borderRadius: pxToRem(8),
          boxShadow: `0 0 ${pxToRem(10)} rgba(0, 0, 0, 0.1)`,
          padding: pxToRem(24),
          marginBottom: pxToRem(24),
        }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: pxToRem(16),
            marginBottom: pxToRem(16),
          }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: theme.colors.secondary,
              color: theme.palette.text.primary,
              padding: `${pxToRem(4)} ${pxToRem(8)}`,
              textTransform: "uppercase",
              fontWeight: "bold",
            }}>
            Pro
          </Button>
          <Typography variant="h6">{t("plan")}</Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: pxToRem(16),
            marginBottom: pxToRem(16),
          }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: pxToRem(8),
            }}>
            <CheckCircleIcon sx={{ color: theme.palette.success.main }} />
            <Typography
              sx={{
                color: theme.palette.success.main,
                fontWeight: "bold",
              }}>
              {t("subscribed")}
            </Typography>
          </Box>
          <Typography>{t("until")} date expire</Typography>
          <Button
            sx={{
              color: theme.palette.text.primary,
              textTransform: "none",
            }}>
            {t("resume")}
          </Button>
        </Box>
        <Divider />
        {/* Metodo di pagamento */}
        <Box sx={{ marginTop: pxToRem(16) }}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", marginBottom: pxToRem(8) }}>
            {t("payment_method")}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: pxToRem(16),
            }}>
            <PayPalIcon
              sx={{ fontSize: pxToRem(32), color: theme.palette.text.primary }}
            />
            <Typography>PayPal - user email</Typography>
            <Button
              sx={{
                color: theme.palette.text.primary,
                textTransform: "none",
              }}>
              {t("change_payment_method")}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BillingSection;
