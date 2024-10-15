// components/forms/LinkSettings.js
import React from "react";
import { Box } from "@mui/material";
import LinkDurationField from "../customComponents/LinkDurationField";
import FixedLinkSwitch from "../customComponents/FixedLinkSwitch";
import DateRangePicker from "./DateRangePicker";

const LinkSettings = ({
  linkDuration,
  isFixedLink,
  setIsFixedLink,
  selectedCheckInDate,
  setSelectedCheckInDate,
  selectedCheckOutDate,
  setSelectedCheckOutDate,
}) => {
  return (
    <>
      <LinkDurationField linkDuration={linkDuration} />
      <FixedLinkSwitch
        isFixedLink={isFixedLink}
        onChange={(e) => {
          const isChecked = e.target.checked;
          setIsFixedLink(isChecked);

          if (isChecked) {
            setSelectedCheckInDate(null);
            setSelectedCheckOutDate(null);
          }
        }}
      />
      {!isFixedLink && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <DateRangePicker
            selectedCheckInDate={selectedCheckInDate}
            setSelectedCheckInDate={setSelectedCheckInDate}
            selectedCheckOutDate={selectedCheckOutDate}
            setSelectedCheckOutDate={setSelectedCheckOutDate}
          />
        </Box>
      )}
    </>
  );
};

export default LinkSettings;
