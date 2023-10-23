import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format, addDays } from 'date-fns'; 
import '../Css/CalendarRange.css';

const CalendarRange = ({ startDate, endDate }) => {
  const selectedStartDate = new Date(startDate); // 문자열로 받은 시작일을 Date 객체로 변환
  const selectedEndDate = new Date(endDate); // 문자열로 받은 마감일을 Date 객체로 변환

  console.log(selectedStartDate, selectedEndDate)
  const rangeStartDate = addDays(selectedStartDate, -1);

  const tileClassName = ({ date }) => {
    date.setHours(0, 0, 0, 0);
    if (date >= rangeStartDate && date <= selectedEndDate) {
      return 'range';
    }
    if (
      selectedStartDate &&
      date.toDateString() === selectedStartDate.toDateString()
    ) {
      return 'rangeStart';
    }
    return null;
  };

  const tileDisabled = ({ date }) => {
    date.setHours(0, 0, 0, 0);
    if (
      selectedStartDate &&
      selectedEndDate &&
      (date < rangeStartDate || date > selectedEndDate)
    ) {
      return true;
    }
    return false;
  };

  const formatDate = date => format(date, 'd');

  return (
    <div>
      <h1 id={'calendarTitle'}>텃밭 신청 모집 기간</h1>
      
      <Calendar
        value={startDate ? new Date(startDate) : new Date()}
        tileClassName={tileClassName}
        tileDisabled={tileDisabled}
        formatDay={(locale, date) => formatDate(date)}
      />
    </div>
  );
}


export default CalendarRange