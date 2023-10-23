import React from "react";
import DatePicker from 'react-datepicker';
import '../Css/CalendarDatePick.css';
import { ko } from "date-fns/esm/locale";
import { format } from 'date-fns'; // format 함수 가져오기
import 'react-datepicker/dist/react-datepicker.css';

const CalendarDatePick = ({ value, onChange }) => {
  // Ensure that the value is a Date object
  const dateObject = value instanceof Date ? value : new Date(value);
  
  // Check if the dateObject is a valid Date
  const isValidDate = dateObject instanceof Date && !isNaN(dateObject);

  // Handle date changes
  const handleDateChange = (date) => {
    if (date instanceof Date) {
      onChange(date);
    } else {
      console.error("Invalid date object:", date);
    }
  };

  return (
    <div>
      <DatePicker
        locale={ko}
        selected={isValidDate ? dateObject : null}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd"
        showTimeSelect={false}
      />
    </div>
  );
};

export default CalendarDatePick;
