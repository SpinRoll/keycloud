// src/components/modals/EditApartmentModal.js
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle, Box } from "@mui/material";
import { pxToRem } from "../../utils/pxToRem";
import LinkDurationField from "../customComponents/LinkDurationField";
import FixedLinkSwitch from "../customComponents/FixedLinkSwitch";
import DatePickers from "../customComponents/DatePickers";
import GenerateLinkButton from "../customComponents/GenerateLinkButton";
import CopyLinkField from "../customComponents/CopyLinkField";
import ActionButtons from "../customComponents/ActionButtons";

const EditApartmentModal = ({
  open,
  onClose,
  apartment,
  onLinkGenerated,
  disabled,
}) => {
  const [localGeneratedLink, setLocalGeneratedLink] = useState("");
  const [selectedCheckInDate, setSelectedCheckInDate] = useState(null);
  const [selectedCheckOutDate, setSelectedCheckOutDate] = useState(null);
  const [linkDuration, setLinkDuration] = useState("1 gg");
  const [isFixedLink, setIsFixedLink] = useState(false);

  useEffect(() => {
    if (apartment) {
      setLocalGeneratedLink(apartment.generatedLink || "");
    }
  }, [apartment]);

  const generateRandomLink = () => {
    if (apartment) {
      const newLink = `HTTP://q=IDapt=${apartment.id}`;
      setLocalGeneratedLink(newLink);
      onLinkGenerated(apartment.id, newLink);
    }
  };

  const copyToClipboard = () => {
    if (localGeneratedLink) {
      navigator.clipboard
        .writeText(localGeneratedLink)
        .catch((err) =>
          console.error("Errore durante la copia negli appunti: ", err)
        );
    }
  };

  const calculateLinkDuration = (checkIn, checkOut) => {
    if (checkIn && checkOut) {
      if (checkOut.isBefore(checkIn)) {
        setLinkDuration("Data non valida");
      } else {
        const duration = checkOut.diff(checkIn, "day");
        setLinkDuration(`${duration} gg`);
      }
    }
  };

  useEffect(() => {
    if (!isFixedLink) {
      calculateLinkDuration(selectedCheckInDate, selectedCheckOutDate);
    } else {
      setLinkDuration("∞");
    }
  }, [selectedCheckInDate, selectedCheckOutDate, isFixedLink]);

  const isGenerateButtonDisabled = disabled || localGeneratedLink !== "";

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ fontSize: pxToRem(24), textAlign: "center" }}>
        {apartment ? `Edit ${apartment.name}` : "Edit Apartment"}
      </DialogTitle>

      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: pxToRem(8),
          width: pxToRem(300),
          padding: pxToRem(16),
        }}>
        {apartment && (
          <>
            <LinkDurationField linkDuration={linkDuration} />
            <FixedLinkSwitch
              isFixedLink={isFixedLink}
              onChange={(e) => setIsFixedLink(e.target.checked)}
            />
            <Box
              sx={{
                display: isFixedLink ? "none" : "flex",
                flexDirection: "column",
                gap: pxToRem(16),
              }}>
              <DatePickers
                checkInDate={selectedCheckInDate}
                setCheckInDate={setSelectedCheckInDate}
                checkOutDate={selectedCheckOutDate}
                setCheckOutDate={setSelectedCheckOutDate}
                isDisabled={isFixedLink}
              />
            </Box>
            <GenerateLinkButton
              onClick={generateRandomLink}
              isDisabled={isGenerateButtonDisabled}
            />
            <CopyLinkField link={localGeneratedLink} onCopy={copyToClipboard} />
            <ActionButtons />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditApartmentModal;
