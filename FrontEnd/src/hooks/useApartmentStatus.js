// hooks/useApartmentStatus.js
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

dayjs.extend(utc);

const useApartmentStatus = (apartment) => {
  const theme = useTheme();
  const { t } = useTranslation();

  let statusCode = "inactive";
  let status = t("inactive");

  const hasLink = apartment.link && apartment.link.trim() !== "";
  const hasDates = apartment.data_inizio && apartment.data_fine;
  const isFixedLink = apartment.fixed_link;

  if (hasLink && ((isFixedLink && !hasDates) || (!isFixedLink && hasDates))) {
    // The apartment is active only if a link is generated and either:
    // - fixed_link is true and dates are not provided
    // - OR fixed_link is false and dates are provided
    // Now, we need to check if the dates have expired

    if (!isFixedLink && hasDates) {
      const today = dayjs().utc().startOf("day");
      const dataInizio = dayjs(apartment.data_inizio).utc().startOf("day");
      const dataFine = dayjs(apartment.data_fine).utc().endOf("day");

      if (today.isBefore(dataInizio)) {
        // The apartment is not active yet
        statusCode = "inactive";
        status = t("inactive");
      } else if (today.isAfter(dataFine)) {
        // The apartment has expired
        statusCode = "expired";
        status = t("expired");
      } else {
        // The apartment is currently active
        statusCode = "active";
        status = t("active");
      }
    } else {
      // For fixed links, the apartment is always active
      statusCode = "active";
      status = t("active");
    }
  } else if (hasDates) {
    // The link is not generated, but we can determine if it's expired or inactive
    const today = dayjs().utc().startOf("day");
    const dataFine = dayjs(apartment.data_fine).utc().endOf("day");

    if (today.isAfter(dataFine)) {
      statusCode = "expired";
      status = t("expired");
    } else {
      statusCode = "inactive";
      status = t("inactive");
    }
  } else {
    // No link and no dates
    statusCode = "inactive";
    status = t("inactive");
  }

  const statusColors = {
    active: theme.palette.success.main,
    expired: theme.palette.error.main,
    inactive: theme.palette.warning.main,
  };

  const color = statusColors[statusCode] || theme.palette.text.primary;

  return { status, color };
};

export default useApartmentStatus;
