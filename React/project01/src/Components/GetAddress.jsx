import React from 'react'
import { useState, useEffect } from 'react';
import '../Css/GetAddress.css';
import MapArea from './MapArea'
import Card from './Card';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';


const GetAddress = () => {

  const sidos = [
    {
      name: '광주',
      sigungus : [
        { name : '광산구'}, 
        { name : '동구'},
        { name : '서구'},
        { name : '남구'},
        { name : '북구'}]
    },
    {
      name: '전남',
      sigungus : [
        { name : '나주시'}, 
        { name : '목포시'},
        { name : '여수시'},
        { name : '순천시'},
        { name : '광양시'},
        { name : '화순군'},
        { name : '장성군'}]
    }
  ];

 

  const [sido, setSido] = useState(['']);
  const [sigungu, setSigungu] = useState(['광산구']);
  const [sigungus, setSigungus] = useState(['']);

  console.log('key:', sido, sigungu)
  
  
  const changeSido = (event)=>{
    setSido(event.target.value);
    const siItem = sidos.find((item)=> item.name === event.target.value);
    return setSigungus(siItem.sigungus);
  }

  const changeSigungu = (event)=>{
    setSigungu(event.target.value);
  }

  const [data, setData] = useState([]);
  useEffect(() => {
    // Flask 서버의 주소
    const apiUrl = 'http://192.168.70.237:5022/farm';

    // 텃밭데이터 받아오기
    axios.get(apiUrl, { responseType: 'json', params: { sido : sido, sigungu : sigungu }, })
      .then(response => {
        setData(response.data);
        console.log('db로부터받음', response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [sigungu]);
 
  const nav = useNavigate();

  console.log('봅시다',data)
  // const pickNum = data.map((idx)=>{
  //   nav(`/find/farm${idx.farm_num}`, {state :{idx}})
  // })

  return (
    
    <div className='form'>
      <select className='form-control' value={sido} onChange={changeSido}>
        <option>시/도 선택</option>
        {sidos.map(item=>(
          <option key={item.name} value={item.name}>{item.name}</option>
        ))}

      </select>
      <select className='form-control' value={sigungu} onChange={changeSigungu}>
        <option>시/군/구 선택</option>
        {sigungus.map(item=>(
          <option key={item.name} value={item.name}>{item.name}</option>
        ))}

      </select>
      <MapArea list={data}/>
      <Card list={data} />
    </div>
    
  )
}

export default GetAddress