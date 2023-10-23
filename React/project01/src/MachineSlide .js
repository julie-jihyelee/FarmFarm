import React from 'react'
import  { Component } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import './Css/Machinslide.css'



// 도트 컴포넌트를 커스텀하는 함수형 컴포넌트
const CustomDot = ({ onClick, index, isActive }) => (
  <div
    style={{
      width: '8px',
      height: '8px',
      backgroundColor: 'lightgreen',
      borderRadius: '0%',
      margin: '70px 5px',
      cursor: 'pointer',
    }}
    onClick={onClick}
  />
);

class MachineSlide extends Component {
  render() {
    const { slideData } = this.props;
    console.log('뭐받았나',slideData);

    // 슬라이드 옵션 설정
    const settings = {
      arrows: false, // 화살표 표시 > false 로 설정해서 화살표를 숨긴다
      dots: false, // 밑에 현재 페이지와 나머지 페이지 점으로 표시 > true로 설정하여 페이지 점을 보여준다
      infinite: true, // 무한 반복 여부 (true로 설정해서 무한 반복)
      speed: 1500, // 넘기는 속도
      slidesToShow: 3, // 슬라이드에 보여지는 아이템 개수
      slidesToScroll: 1, // 슬라이드 넘기는 아이템 개수
      autoplay: true, // 자동 재생 여부
      autoplaySpeed: 3000, // 자동 재생 속도
      customPaging: (i) => <CustomDot index={i} />, // customPaging을 사용하여 도트 컴포넌트를 반환
    };
        
        return (
          <div > 
              {/* 슬라이더 컴포넌트 */}
              <Slider {...settings} className='machin_slider-container'>
                {slideData.map((item, index) => (
                  <div className='machin_slider' key={index}>
                    <img src={`http://localhost:3000/img/machine/${item.img}`} className='machin_slideimg' alt={item.name} />
                    <span className='machin_slide'>{item.name}</span><br />
                    <span className='machin_slide_sub1'>오늘 가격(kg/원): <p className='machinslide_sub1'>{item.now}</p> </span><br />
                    <span className='machin_slide_sub2'>일주일뒤 예측가격(kg/원): <p className='machinslide_sub2'>"{item.pre}"</p></span>
                  </div>
                ))}
              </Slider>
            </div>
        );
    }
  }
export default MachineSlide