// src/components/LoadingSpinner.js
import React from "react";
import { CircularProgress, Stack } from "@mui/material";

const LoadingSpin = ({ size = 40 }) => {
  return (
    <Stack alignItems="center">
      <CircularProgress size={size} />
    </Stack>
  );
};

export default LoadingSpin;
