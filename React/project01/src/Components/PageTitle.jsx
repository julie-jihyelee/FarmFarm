import React from 'react'
import '../Css/PageTitle.css'
const PageTitle = ({data, num}) => {
  const title = data;
  console.log(data, num)
  

  return (
    <div className='infopage'>
      <span className='infotitle'>{title}</span>
      <img src={`/img/titlebg${num}.png`} className='infotitle_bg'/>

  </div>
  )
}

export default PageTitle