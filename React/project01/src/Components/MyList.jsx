
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PageTitle from './PageTitle';
import { bottom } from '@popperjs/core';



const MyList = () => {
  
  const initialApplicationList = [
    { num: 1, list: '첫 번째 신청텃밭',area : '15' , price : '200,000', rental : '~24.12.31', date : "2023-08-11"},
    { num: 2, list: '두 번째 신청텃밭',area : '12' , price : '180,000', rental : '~25.12.31', date : "2023-08-10"},
     { num: 3, list: '세 번째 신청텃밭',area : '24', price : '240,000', rental : '~23.12.31', date : "2023-08-09"},
     { num: 4, list: '네 번째 신청텃밭',area : '10', price : '200,000', rental : '~24.06.30', date : "2023-08-07"},
     { num: 5, list: '다섯 번째 신청텃밭',area : '12', price : '150,000', rental : '~24.12.31', date : "2023-08-05"},
     { num: 6, list: '여섯 번째 신청텃밭',area : '18', price : '135,000', rental : '~24.12.31', date : "2023-08-02"}
  ];

  const [applicationList, setApplicationList] = useState(initialApplicationList);
  const [volunteerList, setVolunteerList] = useState([]);


  const userId = sessionStorage.getItem('user_id')


  useEffect(()=>{
    // 신청내역
    const myListyUrl = 'http://192.168.70.237:5022/myList';
    axios.get(myListyUrl, { responseType: 'json', params:{ user_id : userId } })
    .then(response => {
      console.log('신청내역 받아온거', response.data);
      setApplicationList(response.data)
    })
    .catch(error => {
      console.error('보내기 에러');
    });

  },[])


  useEffect(()=>{
    // 신청자
    const myListyUrl = 'http://192.168.70.237:5022/myList2';
    axios.get(myListyUrl, { responseType: 'json', params:{ user_id : userId } })
    .then(response => {
      console.log('신청자 받아온거', response.data);
      setVolunteerList(response.data)
    })
    .catch(error => {
      console.error('보내기 에러');
    });

  },[])


  const del = (applicationNum) => {
      const delUrl = 'http://192.168.70.237:5022/delete';
      axios
      .get(delUrl, { responseType: 'json', params: { application_num: applicationNum } })
      .then(response => {
        console.log('Response from server:', response.data);
        if (response.data.message === 'success') {
          // 여기서 바로 리디렉션을 수행
          alert('분양 신청이 취소되었습니다.');
          window.location.reload(); // 페이지 새로고침
        } else {
          alert('분양 취소 중 오류가 발생했습니다.');
        }
      })
      .catch(error => {
        console.error('Error sending data:', error);
        alert('취소 중 오류가 발생했습니다.');
      });
  };

  const userType = sessionStorage.getItem('user_type');

  console.log('유저타입',userType);

  return (
    <>
    <PageTitle data={'신청내역'} num={2}/>
    
    {userType === '0'? 
    <div className="mypage-container">
      <h1 className='mypage-title'>텃밭신청내역</h1>
      <table className="application-table">
        <thead className='abc-container'>
          <tr >
            <th className='aaa'>신청번호</th>
            <th className='bbb'>신청내역</th>
            <th className='ccc'>신청일</th>
            <th >취소</th>
            
            
          </tr>
        </thead>
        <tbody>
          {applicationList.map((application) => (
            <tr>
            <td key={application.application_num} className='mycard'>
              <p>{application.application_num}</p>
              
            </td>
            <td>
              <h2 >신청한 텃밭 : </h2>
              <span className='apply_gardenname'> {application.farm_title}</span>
              <p>텃밭 면적 : {application.lental_area}m²</p>
              <p>분양가 : {application.farm_price}원</p>
              <h3>임대시작 : {application.lental_startDate}</h3>
              <h3>임대끝 : {application.lental_endDate}</h3>
            </td>
            <td>
              <p> {application.apply_day}</p>
            </td>
            <td>
              <button className='ddd' onClick={() => del(application.application_num)}> 취소하기 </button>
              {/* <button className='ddd' onClick={del}> 취소하기 </button> */}
            </td>
            </tr>   

            
          ))}
        </tbody>
      </table>
     </div> :
     <div className="mypage-container">
     <h1 className='mypage-title'>텃밭신청내역</h1>
     <table className="application-table">
       <thead>
         <tr>
           <th className='aaa'>신청번호</th>
           <th className='bbb'>신청내역</th>
           <th className='ccc'>신청일</th>
           <th >취소</th>
           
           
         </tr>
       </thead>
       <tbody>
         {applicationList.map((application) => (
           <tr>
           <td key={application.application_num} className='mycard'>
             <p>{application.application_num}</p>
             
           </td>
           <td>
             <h2 className='ap1'>신청한 텃밭 :  <span className='apply_gardenname'> {application.farm_title}</span></h2>
             
             <p className='ap1'>텃밭 면적 : <span className='apply_gardenname'>{application.lental_area} m²</span></p>
             <p className='ap1'>분양가 : <span className='apply_gardenname'>{application.farm_price} 원</span></p>
             <h3 className='ap1'>임대시작 :  <span className='apply_gardenname'> {application.lental_startDate}</span></h3>
             <h3 className='ap1'>임대끝 :  <span className='apply_gardenname'>{application.lental_endDate}</span></h3>
           </td>
           <td>
             <p> {application.apply_day}</p>
           </td>
           <td>
             <button className='ddd' onClick={() => del(application.application_num)}> 취소하기 </button>
             {/* <button className='ddd' onClick={del}> 취소하기 </button> */}
           </td>
           </tr>   

           
         ))}
       </tbody>
     </table>
      <h1 className='mypage-title1'>텃밭신청자 내역</h1>
      <table className="application-table1" >
        <thead >
            <tr>
              <th className='aaa'>신청번호</th>
              <th className='bbb'>신청자 내역</th>
              <th className='ccc'>신청일</th>
              <th>취소</th>
            </tr>
        </thead>
        <tbody>
          {volunteerList.map((application) => (
            <tr>
            <td key={application.application_num} className='mycard'>
              <p>{application.application_num}</p>
              
            </td>
            <td>

              <h2 className='ap1'>신청한 사람 : <span className='apply_gardenname'> {application.user_id}</span></h2>
              <h2 className='ap1'>신청한 텃밭 : <span className='apply_gardenname'> {application.farm_title}</span></h2>
              <h3 className='ap1'>임대시작 :<span className='apply_gardenname'> {application.lental_startDate}</span> </h3>
              <h3 className='ap1'>임대끝 : <span className='apply_gardenname'>{application.lental_endDate}</span></h3>
            </td>
            <td>
              <p> {application.apply_day}</p>
            </td>
            <td>
              <button className='ddd' onClick={() => del(application.application_num)}> 취소하기 </button>
              {/* <button className='ddd' onClick={del}> 취소하기 </button> */}
            </td>
            </tr>   

            
          ))}
        </tbody>
      </table>
    </div>}
    </>       
  );
};

export default MyList;