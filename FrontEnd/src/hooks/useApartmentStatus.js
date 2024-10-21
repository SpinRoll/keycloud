// hooks/useApartmentStatus.js
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

dayjs.extend(utc);

const useApartmentStatus = (apartment) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const today = dayjs().utc().startOf("day");
  const dataInizio = apartment.data_inizio
    ? dayjs(apartment.data_inizio).utc().startOf("day")
    : null;
  const dataFine = apartment.data_fine
    ? dayjs(apartment.data_fine).utc().endOf("day")
    : null;

  const hasLink = apartment.link && apartment.link.trim() !== "";
  const hasDates = dataInizio && dataFine;
  const isFixedLink = apartment.fixed_link;

  let statusCode = "inactive";
  let status = t("inactive");

  if (hasLink) {
    if (
      isFixedLink ||
      (hasDates && !today.isBefore(dataInizio) && !today.isAfter(dataFine))
    ) {
      // Se il link è fisso o le date sono valide (oggi è compreso tra data_inizio e data_fine)
      statusCode = "active";
      status = t("active");
    } else if (hasDates && today.isAfter(dataFine)) {
      // Se le date sono presenti ma la data di fine è passata
      statusCode = "expired";
      status = t("expired");
    } else {
      // Qualsiasi altro caso con link non valido o date future
      statusCode = "inactive";
      status = t("inactive");
    }
  } else if (hasDates) {
    // Nessun link ma ci sono date, controlliamo se è scaduto
    if (today.isAfter(dataFine)) {
      statusCode = "expired";
      status = t("expired");
    } else {
      statusCode = "inactive";
      status = t("inactive");
    }
  } else {
    // Caso in cui non c'è né link né date
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
