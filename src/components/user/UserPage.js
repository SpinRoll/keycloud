// src/components/user/UserPage.js
import React from "react"; // Importo React per creare componenti
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemText,
} from "@mui/material"; // Importo i componenti Material-UI
import { pxToRem } from "../../utils/pxToRem"; // Importo la funzione pxToRem per convertire px in rem
import { useTheme } from "@mui/material/styles"; // Importa useTheme per accedere al tema corrente
import { useTranslation } from "react-i18next"; // Importo il hook useTranslation
import CustomButton from "../customComponents/CustomButton";

const UserPage = () => {
  const theme = useTheme(); // Uso il tema corrente
  const { t } = useTranslation(); // Uso il hook useTranslation per ottenere la funzione di traduzione

  return (
    <Container component="main" maxWidth="100%" sx={{ mt: pxToRem(100) }}>
      {" "}
      {/* Contenitore principale con margine superiore */}
      <Box sx={{ display: "flex", gap: pxToRem(24), flexWrap: "wrap" }}>
        {/* Layout principale diviso in due colonne */}
        {/* Sezione laterale sinistra per la navigazione */}
        <Box
          sx={{
            width: { xs: "100%", md: pxToRem(200) },
            backgroundColor: theme.palette.background.paper,
            borderRadius: pxToRem(8),
            boxShadow: `0px ${pxToRem(0)} ${pxToRem(10)} #635FC7`,
            padding: pxToRem(16),
          }}>
          <List component="nav">
            <ListItem button sx={{ pl: pxToRem(4) }}>
              <ListItemText primary={t("profile")} />
            </ListItem>
            <ListItem button sx={{ pl: pxToRem(4) }}>
              <ListItemText primary={t("billing")} />
            </ListItem>
            <ListItem button sx={{ pl: pxToRem(4) }}>
              <ListItemText primary={t("password")} />
            </ListItem>
            <ListItem button sx={{ pl: pxToRem(4) }}>
              <ListItemText primary={t("notifications")} />
            </ListItem>
          </List>
        </Box>
        {/* Sezione principale per i dettagli dell'utente */}
        <Box
          sx={{
            flexGrow: 1,
            backgroundColor: theme.palette.background.paper,
            borderRadius: pxToRem(8),
            boxShadow: `0px ${pxToRem(0)} ${pxToRem(10)} #635FC7`,
            padding: pxToRem(32),
          }}>
          {/* Titolo e navigazione dell'account */}
          <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
            {t("my_account")} &gt; {t("profile")}
          </Typography>
          <Typography
            variant="h3"
            sx={{ fontWeight: "bold", marginBottom: pxToRem(24) }}>
            {t("profile")}
          </Typography>

          {/* Sezione per l'avatar e caricamento immagine */}
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
            <Button
              variant="outlined"
              sx={{ color: theme.palette.primary.main }}>
              {t("upload_new_pic")}
            </Button>
          </Box>

          {/* Campi di input per il profilo */}
          <Box sx={{ marginBottom: pxToRem(16) }}>
            <Typography
              variant="subtitle1"
              sx={{
                color: theme.palette.text.primary,
                marginBottom: pxToRem(8),
              }}>
              {t("username")}
            </Typography>
            <TextField variant="outlined" fullWidth defaultValue="LordDrago" />
          </Box>

          <Box sx={{ marginBottom: pxToRem(16) }}>
            <Typography
              variant="subtitle1"
              sx={{
                color: theme.palette.text.primary,
                marginBottom: pxToRem(8),
              }}>
              {t("email_address")}
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              defaultValue="catana.ion17@yahoo.it"
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}>
            {/* Bottone per salvare le modifiche */}
            <CustomButton
              variant="contained"
              color="primary"
              sx={{
                width: "auto",
              }}>
              {t("save")}
            </CustomButton>

            {/* Logout */}
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
      </Box>
    </Container>
  );
};

export default UserPage;
