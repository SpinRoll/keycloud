// src/components/customComponents/DatePickers.js
import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs"; // Importa dayjs per gestire le date

const DatePickers = ({
  checkInDate,
  setCheckInDate,
  checkOutDate,
  setCheckOutDate,
  isDisabled,
}) => {
  const today = dayjs(); // Data corrente

  // Stili personalizzati per le date disattivate con una "X" rosa
  const disableDateStyles = {
    cursor: "not-allowed", // Indica che non è possibile selezionare
    position: "relative", // Posizionamento relativo per aggiungere un elemento prima
    "&::before": {
      content: "'X'", // Contenuto della "X"
      fontSize: "1rem", // Dimensione della "X"
      color: "#FF9898", // Colore rosa per la "X"
      position: "absolute", // Posizionamento assoluto della "X"
      top: "50%", // Centra verticalmente
      left: "50%", // Centra orizzontalmente
      transform: "translate(-50%, -50%)", // Centra perfettamente
      fontWeight: "lighter", // Rende la "X" più evidente
      pointerEvents: "none", // Impedisce l'interazione con la "X"
    },
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* DatePicker per la data di check-in */}
      <DatePicker
        label="Check-in date"
        value={checkInDate}
        onChange={setCheckInDate}
        disabled={isDisabled}
        minDate={today} // Imposta la data minima selezionabile al giorno corrente
        slotProps={{
          day: (ownerState) => ({
            sx: {
              ...(ownerState.day.isBefore(today, "day") && disableDateStyles), // Applica stile personalizzato alle date disattivate
            },
          }),
        }}
      />
      {/* DatePicker per la data di check-out */}
      <DatePicker
        label="Check-out date"
        value={checkOutDate}
        onChange={setCheckOutDate}
        disabled={isDisabled}
        minDate={checkInDate || today} // Imposta la data minima di check-out come la data di check-in o il giorno corrente
        slotProps={{
          day: (ownerState) => ({
            sx: {
              ...(ownerState.day.isBefore(checkInDate || today, "day") &&
                disableDateStyles), // Applica stile personalizzato alle date disattivate
            },
          }),
        }}
      />
    </LocalizationProvider>
  );
};

export default DatePickers;
