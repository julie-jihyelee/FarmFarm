import React, {useState, useEffect, useRef} from 'react';
import { Routes, Route, NavLink} from 'react-router-dom';
import FindGarden from './pages/FindGarden';
import Community from './pages/Community';
import Mypage from './pages/Mypage';
import OutGarden from './pages/OutGarden';
import Mainpage from './Mainpage';
import Join from './pages/Join';
import Card from './Components/Card';
import Login from './pages/Login';
import Machin from './pages/Machin';
import Cone from './Components/Cone';
import Ctwo from './Components/Ctwo';
import Cthree from './Components/Cthree';
import CardDetailsPage from './Components/CardDetailsPage';
import Notice from './pages/Notice';
import axios from 'axios';
import CalendarDatePick from './Components/CalendarDatePick';
import './Header.css'

import FindDetail from './Components/FindDetail';
import Header from './Components/Header';
import FarmDetail from './pages/FarmDetail';
import Maptest from './Components/Maptest';
import MyList from './Components/MyList';
import Myinfo from './Components/MyInfo';




function Main() {

  const [data, setData] = useState([]); //요기2


  useEffect(() => {
   // Flask 서버의 주소
   const apiUrl = 'http://192.168.70.237:5022/content';
   console.log("test")
   // Axios를 사용하여 GET 요청 보내기
   axios.get(apiUrl, { responseType: 'json'})
     .then(response => {
        setData(response.data); //요기
       console.log('testdb로부터받음', response.data);
     })
     .catch(error => {
       console.error('Error fetching data:', error);
     });
 }, []);
 
 

  const savedCards = data;
  const [isWriting, setIsWriting] = useState(false);
  const [cards, setCards] = useState(savedCards);
  const [cardCounter, setCardCounter] = useState(savedCards.length + 1);

  const handleAddCard = (card) => {
    const newCard = { ...card, id: cardCounter, expanded: false };
    setCards([...cards, newCard]);
    setCardCounter(cardCounter + 1);
    setIsWriting(false);
  };


  return (

    <div  >
      <Header />
      <Routes>
        <Route path='/calendar' element={<CalendarDatePick />}/>
        <Route path='/' element={<Mainpage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/join' element={<Join />} />
        <Route path='/card' element={<Card />} />
        <Route path='/find' element={<FindGarden />} />
        <Route path='/find/test' element={<Maptest />} />
        <Route path='/find/farm' element={<FindDetail />} />
        <Route path='/out' element={<OutGarden />} />
        <Route path='/community' element={<Community />} />
        <Route path='/mypage' element={<Mypage />} />
        <Route path='/mypage/info' element={<Myinfo/>} />
        <Route path='/mypage/mylist' element={<MyList />} />
        <Route path='/cone' element={<Cone value={savedCards}/>} />
        <Route path='/ctwo' element={<Ctwo />} />
        <Route path='/cthree' element={<Cthree />} />
        <Route path='/machin' element={<Machin />} />
        <Route path="/cardpage/:cardId" element={<CardDetailsPage value={savedCards}/>} />
        <Route path='/notice' elemenft={<Notice />} />
      </Routes>
     
    </div>
  );
}


export default Main;