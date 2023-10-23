import React, { useState } from 'react';
import ScrollToTop from '../ScrollToTop'
const Ctwo = () => {
  const [farmingTips, setFarmingTips] = useState([
    {
      id: 1,
      title: '예초기 사용법',
      content: '텃밭의 잡초를 제거하기 위해 예초기를 사용해봅시다. 모두함께 사용법을 알아볼까요?',
      subcontent: '능력 : ●●●○○',
      imgUrl:'/img/yecho.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=sSLj1fIehJ0',
    },
    {
      id: 2,
      title: '비료 사용 시기',
      content: '비료는 식물이 성장하는 봄에 주로 사용하는 것이 좋습니다.하지만 과다한 비료 사용은 주의해야 합니다.',
      subcontent: '능력 : ●●○○○',
      imgUrl:'/img/biryo.png',
      videoUrl: 'https://www.youtube.com/watch?v=8qhOWAGENMo',
    },
    {
      id: 3,
      title: '물 주기',
      content: '물을 주는 시기와 양을 적절히 조절하여 식물이 건강하게 자라도록 도와줍니다.',
      imgUrl : 'img/muljugi.jpg',
      subcontent: '능력 : ●○○○○',
      videoUrl: 'https://www.youtube.com/watch?v=IHvp5Iv49eg',
    },
    {
      id: 4,
      title: '텃밭 작물 선택',
      content: '특정 지역의 기후와 토양 조건에 적합한 작물을 선택하는 것이 중요합니다. 작물의 특성을 이해하고 잘 관리하여 효과적인 수확을 얻을 수 있습니다.',
      imgUrl : 'img/jakmulchoice.jpg',
      subcontent: '능력 : ●●●○○',
      videoUrl: 'https://www.youtube.com/watch?v=IHvp5Iv49eg',
    },
    {
      id: 5,
      title: '작물 병해충 및 질병 관리',
      imgUrl : 'img/haechung.jpg',
      subcontent: '능력 : ●●●●○',
      content: '작물에 영향을 미치는 병, 해충 및 질병에 대한 조기 발견과 예방 방법을 알고 대처해야 합니다.',
      videoUrl: 'https://www.youtube.com/watch?v=Tda9PT0rrjc',
    },
    {
      id: 6,
      title: '기후와 계절 변화',
      content: '기후와 계절 변화에 대응하여 작물 재배와 농업 생산 방법을 조정해야 합니다.',
      imgUrl : 'img/seasons.jpg',
      subcontent: '능력 : ●●●●○',
      videoUrl: 'https://www.youtube.com/watch?v=znoVPI6zZoA',
    },
    {
      id: 7,
      title: '농촌 정책과 지원',
      content: '농촌 지역에서 정부의 농업 정책과 지원 제도에 대한 이해가 필요합니다.',
      imgUrl : 'img/jungcheck.jpg',
      subcontent: '능력 : ●●●●○',
      videoUrl: 'https://www.youtube.com/watch?v=hvNkDn0jHQU',
    },
    {
      id: 8,
      title: '농업 법규와 규제',
      content: '농업은 다양한 법규와 규제에 영향을 받습니다. 농지 사용 규정, 환경 보호 법규, 노동 법규 등을 준수해야 합니다.',
      imgUrl : 'img/bubgyu.jpg',
      subcontent: '능력 : ●●●○○',
      videoUrl: 'https://www.youtube.com/watch?v=MoULEqfyCCc&t=26s',
    },
    {
      id: 9,
      title: '재배 시스템의 다양화',
      content: '단일작물에 의존하지 않고 다양한 작물을 재배하는 다작물 재배 시스템을 도입하여 생산성을 향상시킬 수 있습니다.',
      imgUrl : 'img/dayang.jpg',
      subcontent: '능력 : ●●●●●',
      videoUrl: 'https://www.youtube.com/watch?v=x6uRAq1r1so',
    },
    {
      id: 10,
      title: '농촌 사회와 네트워킹',
      content: '농촌 사회와 소통하고 협력하는 능력이 중요합니다. 농업 협동조합, 지역 농업 협회 등에 가입하여 지역 농부들과 네트워킹하며 정보를 교류하는 것이 유익합니다.',
      imgUrl : 'img/networking.jpg',
      subcontent: '능력 : ●●○○○',
      videoUrl: 'https://www.youtube.com/watch?v=zUSLc4Coi3k',
    },
  ]);

  const [clickedCard, setClickedCard] = useState(null);



  const handleCardClick = (index) => {
    if (clickedCard === index) {
      // 이미 클릭된 상태면 클릭 해제
      setClickedCard(null);
    } else {
      // 클릭된 상태로 변경
      setClickedCard(index);
    }
  };



  

  return (

  //  카드 뒤집기 효과  https://gurtn.tistory.com/157
    <div >
      <ScrollToTop />
       <div className='infopage'>
    <span className='infotitle'>농사 정보</span>
    <img src='/img/titlebg2.png' className='infotitle_bg'/>
    </div>
      <h1 className='ctwotitle'>팜팜 농사카드</h1>
      <div >
      
      <div className='card-container1'>
        {farmingTips.map((tip, index) => (
          <div key={tip.id} >
            <div className='flip' onClick={() => handleCardClick(index)}>
              <div className={`c2-card ${clickedCard === index ? 'clicked' : ''}`}>
                <div className='backcard'>
                  <div className='text-border'>
                  <h3 className='card2-title'>{tip.title}</h3>
                  <p className='card2-subtitle'>{tip.content}</p>
                  <span className='card2_subtitle'>{tip.subcontent}</span>
                  
                  </div>
                  <img src={tip.imgUrl} className='c2img' alt={`이미지 ${index + 1}`} />
                </div>
                <img src='/img/backcard.png' className='frontcard' />
              </div>
            </div>
           <div className='upgrade'>
              <a href={tip.videoUrl} target='_blank' >
                능력 업그레이드💪
              </a>
              </div> 
          </div>
        ))}
        <div className='c2-border'></div>
        </div>
      </div>
      </div>  
   
  );
};


export default Ctwo;