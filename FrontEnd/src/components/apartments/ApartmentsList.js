// components/apartments/ApartmentsList.js
import React from "react";
import { List, Typography } from "@mui/material";
import ApartmentListItem from "./ApartmentListItem";
import { useTranslation } from "react-i18next";

const ApartmentsList = ({ apartments, onEditApartment }) => {
  const { t } = useTranslation();

  if (apartments.length === 0) {
    return (
      <Typography variant="body1" sx={{ marginTop: 2 }}>
        {t("no_apartments_message")}
      </Typography>
    );
  }

  return (
    <List sx={{ width: "100%" }}>
      {apartments.map((apartment) => (
        <ApartmentListItem
          key={apartment._id}
          apartment={apartment}
          onEdit={() => onEditApartment(apartment)}
        />
      ))}
    </List>
  );
};

export default ApartmentsList;
