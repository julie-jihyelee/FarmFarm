// OutGarden.js
import React, { useState, useEffect } from 'react';
import '../Css/OutGarden.css'
import PageTitle from '../Components/PageTitle';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DaumPost from '../Components/Daumpost2';
import Swal from "sweetalert2";
import '../Components/CalendarDatePick'

import CalendarDatePick from '../Components/CalendarDatePick';
import { format } from 'date-fns'; // format 함수 가져오기
import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz'; // date-fns-tz 라이브러리 추가
import ScrollToTop from '../ScrollToTop'

//  모달창으로 할지 sweetalert2에서 꺼내서 사용할지 결정해야함!!!!!!


function OutGarden() {
  // 텃밭 등록 페이지를 위한 상태
  // const [isLogin, setIsLogin] = useState(sessionStorage.getItem('user_id')); // isLogin 상태 추가
  const user = sessionStorage.getItem('user_id')


  const [form, setForm] = useState({ farm_title : '', farm_address :'', lental_area : '', farm_sector: '', lental_type: '소형', 
    farm_type:'개인', farm_price: '', lental_startDate:'', lental_endDate:'', startDate:'', endDate:'', description:'', user_id: user});
  const nav = useNavigate();
  

  // useEffect(()=>{
  //   if (isLogin !== null){
  //     setIsLogin(true)
  //     setForm({...form, user_id : sessionStorage.getItem('user_id')})
  //   } else {
  //     alert('로그인이 필요한 서비스입니다.');
  //     nav('/login')
  //   }
  
  // },[])
 


  const [selectedDate, setSelectedDate] = useState(new Date()); // 현재 날짜로 초기화

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  



  const [selectedType, setSelectedType] = useState('');
  const [selectedFarmType, setSelectedFarmType] = useState('');
  const [imageFile, setImageFile] = useState(null);






  const handleTypeButtonClick = (e) => {
    setSelectedType(e);
    setForm({...form, lental_type : e});
  };

  const handleFarmTypeButtonClick = (e) => {
    setSelectedFarmType(e);
    setForm({...form, farm_type : e});
  };
   
  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  
  const apiUrl = 'http://192.168.70.237:5022/add_farm';//여기 주소 추가 필요
  const [resData, setResData] = useState();
  
  const infoSending = ()=>{
    const formData = new FormData ();
    formData.append('farm_title', form.farm_title)
    formData.append('farm_type', form.farm_type)
    formData.append('farm_address', form.farm_address)
    formData.append('farm_price', form.farm_price)
    formData.append('user_id', form.user_id)
    formData.append('lental_area', form.lental_area)
    formData.append('farm_sector', form.farm_sector)
    formData.append('lental_type', form.lental_type)
    formData.append('startDate', form.startDate)
    formData.append('endDate', form.endDate)
    formData.append('lental_startDate', form.lental_startDate)
    formData.append('lental_endDate', form.lental_endDate)
    formData.append('description', form.description)
    formData.append('farm_img', imageFile);

    console.log('등록내용확인',form)
    console.log('등록내용확인-s',formData)

    axios.post(apiUrl, formData)
    .then(response => {
      setResData(response.data)
      console.log('등록하기 받아온값', response.data);

      if(response.data === true){
        Swal.fire({
          title: 'FarmFarm!',
          timer: 0,
          text: '소중한 게시물이 심어졌습니다!',
          confirmButtonColor: '#05AC7B',
          imageUrl: 'https://i.gifer.com/ZdPH.gif',
    
          imageWidth:130,
          imageHeight: 200,
          imageAlt: 'Custom image',
        })
        sessionStorage.setItem ('user_type' , 1 )
        nav('/find');
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: '정보 등록에 실패하였습니다!<br/> 다시 시도해주세요',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }

  const setAddress = (newAddress) => {
    setForm({ ...form, farm_address: newAddress });
  };



  const handleLentalStartDateChange = (date) => {
    const selectedDate = utcToZonedTime(date, 'Asia/Seoul');
    setForm({ ...form, lental_startDate: selectedDate.toISOString().split('T')[0] });
  };

  const handleLentalEndDateChange = (date) => {
    const selectedDate = utcToZonedTime(date, 'Asia/Seoul');
    setForm({ ...form, lental_endDate: selectedDate.toISOString().split('T')[0] });
  };

  const handleStartDateChange = (date) => {
    const selectedDate = utcToZonedTime(date, 'Asia/Seoul');
    setForm({ ...form, startDate: selectedDate.toISOString().split('T')[0] });
  };

  const handleEndDateChange = (date) => {
    const selectedDate = utcToZonedTime(date, 'Asia/Seoul');
    setForm({ ...form, endDate: selectedDate.toISOString().split('T')[0] });
  }


  return (

    <>
    <ScrollToTop />
    <PageTitle data={'텃밭 등록'} num={1}/>

    
              <div className="out-container">
               <img src='/img/leaves1.png' className='leaves1'/>
               <img src='/img/leave2.png' className='leave2'/>
                <div className='outgarden-container'>
                  <h1 className='out_maintitle'>텃밭등록하기</h1>
                  <form>
                    <div className="form1">
                      <label htmlFor="gardenName">텃밭 이름:</label>
                      <input
                        type="text"
                        id="gardenName"
                        placeholder='이름을 입력해주세요'
                        value={form.farm_title}
                        onChange={(e)=>{
                          setForm({...form, farm_title : e.target.value})
                        }}
                        required
                      />
                    </div>

                    <div className="form2">
                      <label htmlFor="gardenImages">이미지 업로드 :<br />(최대 1장)</label>
                      <input type="file" id="gardenImages" onChange={handleImageChange} className='photo'/>
                    </div>

                    <div className="form3">
                      <label htmlFor="address">텃밭 주소:</label>
                      <input
                        type="text"
                        placeholder='텃밭 주소를 입력해주세요'
                        id="out_address"
                        autoComplete="address"
                        value={form.farm_address}
                        required
                        onChange={(e)=>{
                          setForm({...form, farm_address : e.target.value})
                        }}
                        //onChange={(e)=>setForm({...form, user_address : e.target.value})}
                      />
                      <DaumPost setForm = {setForm} form={form}></DaumPost> 
                    </div>

                    <div className="form4">
                      <label htmlFor="area">면적(평):</label>
                      <input
                        type="text"
                        placeholder='면적을 입력해주세요'
                        id="out_area"
                        value={form.lental_area}
                        onChange={(e)=>{
                          setForm({...form, lental_area : e.target.value})
                        }}
                        required
                      />
                    </div>
                    <div className="form4_1">
                      <label htmlFor="area_num">분양 개수:</label>
                      <input
                        type="text"
                        placeholder='분양할 텃밭의 개수를 입력하세요.'
                        id="out_areanum"
                        value={form.farm_sector}
                        onChange={(e)=>{
                          setForm({...form, farm_sector : e.target.value})
                        }}
                        required
                      />
                    </div>

                    {/* 라디오 버튼 : 소형, 중형, 대형 */}
                    <div className="form5"> 
                      <label htmlFor="type">텃밭 유형:</label>
                    <div className='outtype_btn'>
                    <button
                      onClick={() => handleTypeButtonClick('대형')}
                      className={`type_button ${selectedType === '대형' ? 'selected' : ''}`}>
                      대형
                    </button> 
                    <button
                      onClick={() => handleTypeButtonClick('중형')}
                      className={`type_button ${selectedType === '중형' ? 'selected' : ''}`}>
                      중형
                    </button>
                    <button
                      onClick={() => handleTypeButtonClick('소형')}
                      className={`type_button ${selectedType === '소형' ? 'selected' : ''}`}>
                      소형
                    </button>
                        
                        </div>
                        
                    </div>

                    {/* 라디오 버튼 : 개인, 민간단체, 지자체 */}
                    <div className="form6"> 
                      <label htmlFor="farmtype">운영 주체:</label>
                      <div className='outtype_btn1'>
                      <button
                      value={form.farm_type}
                      onClick={() => handleFarmTypeButtonClick('개인')}
                      className={`type1_button ${selectedFarmType === '개인' ? 'selected' : ''}`}
                    >
                      개인
                    </button>
                    <button
                      value={form.farm_type}
                      onClick={() => handleFarmTypeButtonClick('민간')}
                      className={`type1_button ${selectedFarmType === '민간' ? 'selected' : ''}`}
                    >
                    민간
                    </button>
                    <button
                      value={form.farm_type}
                      onClick={() => handleFarmTypeButtonClick('공공')}
                      className={`type1_button ${selectedFarmType === '공공' ? 'selected' : ''}`}
                    >
                      공공
                    </button>
                  </div>
                
                    </div>


                    <div className="form7">
                      <label htmlFor="price">분양희망가:</label>
                      <input
                        type="text"
                        id="out_price"
                        placeholder='분양 희망 가격을 입력해주세요'
                        value={form.farm_price}
                        onChange={(e)=>{
                          setForm({...form, farm_price : e.target.value})
                        }}
                        required
                      />
                    </div>

                    {/* 캘린더 위젯 수정 */}
                    <div className="form8">

                      <label htmlFor="rentalPeriod">임대기간 시작일:</label>
                      <CalendarDatePick
          value={form.lental_startDate}
          onChange={handleLentalStartDateChange} // onChange prop 설정
        />
                          {console.log(form.lental_startDate)}
                        {/* <input
                        type="data"
                        id="lental_startDate"
                        value={form.lental_startDate}
                        onChange={(e)=>{
                          setForm({...form, lental_startDate : e.target.value })
                        }}

                        required
                      /> */}
                    </div>
                     {/* 캘린더 위젯 수정 */}
                     <div className="form9">
                     <label htmlFor="rentalPeriod">임대기간 종료일:</label>
                     <CalendarDatePick
          value={form.lental_endDate}
          onChange={handleLentalEndDateChange} // onChange prop 설정
        />
                        {/* <input
                        type="data"
                        id="lental_startDate1"
                        value={form.lental_endDate}
                        onChange={(e)=>{
                          setForm({...form, lental_endDate : e.target.value })
                        }}
                        required
                      /> */}
                    </div>
                      
                    {/* 캘린더 위젯 수정 */}
                    <div className="form10">

                      <label htmlFor="recruitmentPeriod">분양신청 시작일:</label>
                      <CalendarDatePick
          value={form.startDate}
          onChange={handleStartDateChange} // onChange prop 설정
        />
                      {/* <input
                        type="data"
                        id="lental_startDate2"
                        value={form.startDate}
                        onChange={(e)=>{
                          setForm({...form, startDate : e.target.value })
                        }}

                        required
                      /> */}
                    </div>
                      {/* 캘린더 위젯 수정 */}
                      <div className="form11">
                      <label htmlFor="recruitmentPeriod">분양신청 마감일:</label>
                      <CalendarDatePick
          value={form.endDate}
          onChange={handleEndDateChange} // onChange prop 설정
        />
                      {/* <input
                        type="data"
                        id="lental_endDate"
                        value={form.endDate}
                        onChange={(e)=>{
                          setForm({...form, endDate : e.target.value })
                        }}
                        required
                      /> */}
                    </div>

                    <div className="form12">
                      <label htmlFor="description">본문내용:</label>
                      <textarea
                        id="lental_endDate1"
                        placeholder='내용을 입력해주세요'
                        value={form.description}
                        onChange={(e)=>{setForm({...form, description : e.target.value})}}
                        required
                      />
                    </div>


                    <button type='button' className="submit-btn" onClick={infoSending}>

                      등록하기
                    </button>
                   
                  </form>
                </div>
            
           
        </div>   
  </>
  );
}

export default OutGarden;

