// FindGarden.js
import React from 'react';
import GetAddress from '../Components/GetAddress';
import '../Css/GetAddress.css';
import PageTitle from '../Components/PageTitle';


function FindGarden() {
  const style={
    backgroundColor : 'white'
  }
  return (
    <>
    <PageTitle data={'텃밭 검색'} num ={'0'}/>
    <div style={style}>
      <div className='find'>
      <GetAddress/>
      </div>
    </div>
    
    </>
  );
}

export default FindGarden;
