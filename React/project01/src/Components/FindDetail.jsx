import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation,Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'; // useDispatch를 사용하여 액션 디스패치
import MapStatic from './MapStatic';
import '../Css/FarmDetail.css'
import axios from 'axios';
import CalendarRange from './CalendarRange'
import Swal from "sweetalert2";
import ScrollToTop from '../ScrollToTop'



const FindDetail = () => {
  
   const dispatch = useDispatch(); // useDispatch 훅을 통해 디스패치 함수 가져오기

  const locationState = useLocation().state;

  // farms 변수가 존재하고 data 프로퍼티가 존재할 때만 farms 값을 할당
  const farms = locationState && locationState.data;

  const userId = sessionStorage.getItem('user_id')
  const [showSuccessMessage, setShowSuccessMessage]=useState(false);
  const nav = useNavigate();

  const loca = farms ? { lat: farms.lantitude, lng: farms.longitude } : null;

  console.log(loca)


  // 캘린더 적용 코드 (DB랑 연동 필요)
  const startDate = farms ? new Date(farms.startDate) : null;
  const endDate = farms ? new Date(farms.endDate) : null;

  console.log(startDate, endDate)



  if (!locationState) {
    // locationState가 null인 경우, 아무것도 렌더링하지 않고 종료
    return null;
  }



  console.log('받은데이터',farms)

  // 분양신청기간 확인 -> 버튼 비활성화 
  const currentDate = new Date();
  const isWithinDateRange = startDate && endDate && startDate <= currentDate && currentDate <= endDate;



  



  const showConfirmationDialog = () => {
    const userCheckUrl = 'http://192.168.70.237:5022/farm_check'
    axios
        .get(userCheckUrl, { responseType: 'json', params: { user_id : userId, farm_num : farms.farm_num } })
        .then(response => {
          console.log('Response from server:', response.data);
        
          if (!response.data){
            farm_apply();
          }else{
            Swal.fire({
              title: "텃밭 신청 확인",
              text: "이미 신청한 텃밭입니다. 한 번 더 신청하시겠습니까?",
              icon: "question",
              showCancelButton: true,
              confirmButtonText: "신청",
              cancelButtonText: "취소",
            }).then((result) => {
              if (result.isConfirmed) {
                // User clicked "신청"
                farm_apply();
              }
            });
          }

          });
  };








  const farm_apply = ()=>{
    const applyUrl = 'http://192.168.70.237:5022/farm_apply';
    if (userId === farms.user_id){
      Swal.fire({titleText:'본인의 텃밭엔 신청할 수 없어요 ㅠ_ㅠ!',
      confirmButtonColor :'#05AC7B'})
    }else if(userId === null){
      alert('로그인이 필요한 서비스입니다.')
      nav('/login')
    }else{
      axios
        .get(applyUrl, { responseType: 'json', params: { user_id : userId, farm_num : farms.farm_num } })
        .then(response => {
          console.log('Response from server:', response.data);
          if (response.data.message === 'success') {
            setShowSuccessMessage(true);
            // 여기서 바로 리디렉션을 수행
            setTimeout(() => {
              setShowSuccessMessage(false);
              Swal.fire({
                title: '분양신청이 완료되었습니다',
                text:'마이페이지로 이동합니다',
                icon: 'success',
                color:'#00C897' ,
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
              })
              // 작성 완료 메시지가 표시된 후  페이지로 이동
              nav('/mypage/mylist')
              
            }, 10);
          } else {
            alert(response.data.message);
          }
        })
        .catch(error => {
          console.error('Error sending data:', error);
          alert('분양 신청 중 오류가 발생했습니다.');
        });
      }
    }
    const handleHeaderButtonClick = () => {
      // farms 데이터를 스토어에 저장
      dispatch({ type: 'SET_CURRENT_PAGE', payload: farms });
      // 페이지 이동 로직 추가
      nav('/headerbuttonclicked');
    };
  
    if (!farms) {
      return null;
    }
  

 
  return (

  <>
    <div className='farmDetailAll'>
      <ScrollToTop />
      <button onClick={handleHeaderButtonClick}>헤더 버튼</button>
      <img src='/img/farmdetail/farmdetailimg1.jpg' className='farmdetail_img1'/>
      <div className='Fdetail_title-container'>
        <span className='farmdetail_Maintitle'>{farms.farm_title}</span>
        <div className='lental_border'>
          <span className='lental_type'>{farms.lental_type}</span>
        </div>
        <div className='type_border'>
          <span className='farm_type'>{farms.farm_type}</span>
        </div>
        <div className='textbox'>
          <span className='description'>
            
          {farms.description}</span>
          <div className='desc_hr2'></div>
         
        </div>
      </div>
     
      <p className='border_title'>분양 정보</p>
      <p className='farmdetailmaintitle'>텃밭 신청하기</p>
      <div className='part2'>
        
        <img src={`http://192.168.70.237:5022/farm_img/${farms.farm_img}`} className='farm_imgsmall'/>
        <div className='address_border'>
          <img src='/img/mapPin.png' className='address_mappin'/>
          <span className='address'>텃밭 주소</span>
          <span className='farm_address'>{farms.farm_address}</span>
        </div>
       
        <button className={`farmapply_border ${isWithinDateRange ? '' : 'disabled'}`}
        onClick={isWithinDateRange ? showConfirmationDialog : null}>
          <span className={`farmapply_btn ${isWithinDateRange ? '' : 'disabled'}`}
          > {isWithinDateRange ? `분양 신청하기` : `지금은 신청기간이 아니에요!` }
          </span>
        </button>

      </div>
      <div className='part2_sub'>
      <div className='detailAll'>
        <div className='use_id'>
          <span>작성자 :</span><span> {farms.user_nick}</span>
        </div>
        <div className='detail_date'>
          <span>등록일 :</span><span> {farms.farm_day}</span>
        </div>
      </div>
        <div className='lental_all'>
          <img src='/img/calendericon.png' className='calendericon'/>
          <span className='lental_title'>분양기간</span>
          <div className='lentalborderall'>
          <div className='lental_border1'>
            <span className='lental_startDate'>{farms.lental_startDate}</span>
          </div>
          <span className='lental_date'>~</span>
          <div className='lental_border2'>
            <span className='lental_endDate'>{farms.lental_endDate}</span>
          </div>
          </div>
        </div>
  
        <div className='areaAll'>
          <img src='/img/longitude.png' className='lental_areaicon'/>
          <span className='lental_areaTitle'>분양면적</span>
          <div className='area_border1'>
            <span className='lental_area'>{farms.lental_area}</span>
          </div>
        </div>
        
     
        <div className='priceAll'>
          <img src='/img/moneyicon.png' className='moneyicon'/>
          <span className='price_title'>희망분양가</span>
          <div className='price_border1'>
            <span className='price'>{farms.farm_price}</span>
          </div>
        </div>


        <div className='sectorAll'>
          <img src='/img/moneyicon.png' className='moneyicon'/>
          <span className='sector_title'>텃밭 개수</span>
          <div className='sector_border1'>
            <span className='sector'>{farms.farm_sector}</span>
          </div>
        </div>

      
        <div className='call_border'>
          <span className='call_btn'>문의 연락처</span>
          <div className='call_subtitle'>
              <p>{farms.user_name}</p>
              <p>전화 : {farms.user_phone}</p>
              <span>이메일 : {farms.user_email}</span>
          </div>
        </div>
        <Link to='/find'>
           <button className='backlist'>목록으로 돌아가기</button>
        </Link>
        
        <MapStatic className='farmmap' data={loca}/>
      </div>
      <div className='calender'>
          <CalendarRange startDate={startDate} endDate={endDate}/>
        </div>  
       
        
      </div>
      
      </>
  )
}

export default FindDetail