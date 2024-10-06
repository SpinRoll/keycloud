// src/components/customComponents/GenerateLinkButton.js
import React from "react";
import CustomButton from "./CustomButton";
import { Box, Tooltip } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { pxToRem } from "../../utils/pxToRem";

const GenerateLinkButton = ({ onClick, isDisabled }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Tooltip title={isDisabled ? t("cannot_generate_again") : ""}>
      <Box>
        <CustomButton
          variant="contained"
          onClick={onClick}
          disabled={isDisabled}
          sx={{
            marginTop: pxToRem(8),
            marginBottom: pxToRem(8),
            ...(isDisabled && {
              border: `1px solid ${theme.colors.red}`,
              "&:hover": {
                cursor: "not-allowed",
                border: `1px solid ${theme.colors.red}`,
              },
            }),
          }}>
          {t("generate")}
        </CustomButton>
      </Box>
    </Tooltip>
  );
};

export default GenerateLinkButton;
