// components/apartments/ApartmentListItem.js
import React from "react";
import {
  ListItem,
  ListItemText,
  Typography,
  IconButton,
  ListItemSecondaryAction,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { pxToRem } from "../../utils/pxToRem";
import { useTheme } from "@mui/material/styles";
import useApartmentStatus from "../../hooks/useApartmentStatus";
import { useTranslation } from "react-i18next";

const ApartmentListItem = ({ apartment, onEdit }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { status, color } = useApartmentStatus(apartment);

  // Determine the period to display
  let periodDisplay;
  if (apartment.fixed_link) {
    periodDisplay = "∞";
  } else {
    const dataInizio = apartment.data_inizio
      ? new Date(apartment.data_inizio).toLocaleDateString()
      : "N/A";
    const dataFine = apartment.data_fine
      ? new Date(apartment.data_fine).toLocaleDateString()
      : "N/A";
    periodDisplay = `${dataInizio} - ${dataFine}`;
  }

  return (
    <ListItem
      button
      onClick={onEdit}
      sx={{
        borderBottom: `1px solid ${theme.palette.divider}`,
        display: "flex",
        alignItems: "center",
      }}>
      <ListItemText
        primary={<Typography variant="h6">{apartment.nome}</Typography>}
        secondary={
          <Typography
            variant="body2"
            sx={{ color: theme.palette.text.secondary }}>
            {`${t("period")}: ${periodDisplay}`}
          </Typography>
        }
      />
      <Typography
        variant="body2"
        sx={{
          color: color,
          fontWeight: "bold",
          marginRight: pxToRem(10),
        }}>
        {status.toUpperCase()}
      </Typography>
      <ListItemSecondaryAction>
        <IconButton>
          <ArrowForwardIosIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default ApartmentListItem;
