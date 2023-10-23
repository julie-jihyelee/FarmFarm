import React from 'react'
import CalendarRange from './CalendarRange'

const Maptest = () => {
  const startDate = new Date('2023-08-16'); // 시작일
  const endDate = new Date('2023-08-20');
  console.log(startDate, endDate)
  return (
    <>
    <CalendarRange startDate={startDate} endDate={endDate}/>
    </>
  )
}

export default Maptest