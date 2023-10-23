import React, {useEffect, useState} from 'react'
import '../Css/Card.css'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const CardItem = ({name, addr, num, value}) => {

  console.log('데이터:',value)

  const data = value ;

  console.log('저장', data)
  const imgUrl = `http://192.168.70.237:5022/farm_img/${data.farm_img}`

  const nav = useNavigate();
  const send = () =>{
    nav(`/find/farm` , {state : {data}} )
  }


    
  return (
    <div className='searchcard' onClick={send}>
      <Link to={`/find/farm/`}/>
      <div className='imageArea'>
        <img src={imgUrl} alt={name}></img>
      </div>
        <h3 className='stitle'>🌱 {name}</h3>
        <p className='ssubtitle'>{addr}</p>
    </div>
  )
}

export default CardItem