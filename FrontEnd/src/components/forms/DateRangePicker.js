// components/forms/DateRangePicker.js
import React from "react";
import DatePickers from "../customComponents/DatePickers";

const DateRangePicker = ({
  selectedCheckInDate,
  setSelectedCheckInDate,
  selectedCheckOutDate,
  setSelectedCheckOutDate,
}) => {
  return (
    <DatePickers
      checkInDate={selectedCheckInDate}
      setCheckInDate={setSelectedCheckInDate}
      checkOutDate={selectedCheckOutDate}
      setCheckOutDate={setSelectedCheckOutDate}
      isDisabled={false}
    />
  );
};

export default DateRangePicker;
