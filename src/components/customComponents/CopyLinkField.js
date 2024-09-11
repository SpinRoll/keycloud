// src/components/customComponents/CopyLinkField.js
import React from "react";
import { Box, TextField, IconButton } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const CopyLinkField = ({ link, onCopy }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <TextField
        variant="outlined"
        value={link}
        InputProps={{ readOnly: true }}
      />
      <IconButton onClick={onCopy}>
        <ContentCopyIcon />
      </IconButton>
    </Box>
  );
};

export default CopyLinkField;
