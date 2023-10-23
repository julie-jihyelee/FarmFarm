import React, { useState } from 'react';
import PageTitle from '../Components/PageTitle'
import Swal from 'sweetalert2'
import ScrollToTop from '../ScrollToTop'

const Cthree = () => {
  const initialAuctions = [
    {
      id: 1,
      title: '지호호 쌈재료~',
      currentBid: 0,
      bidAmount: 0,
    },
    {
      id: 2,
      title: '지혜의 새콤달콤 과일~',
      currentBid: 0,
      bidAmount: 0,
    },
    {
      id: 3,
      title: '민아의 건강충전 작물!',
      currentBid:0,
      bidAmount: 0,
    },
    {
      id: 4,
      title: '건식네 으랏차차 감자',
      currentBid: 0,
      bidAmount: 0,
    },
    {
      id: 5,
      title: '춘모 애~호~박~',
      currentBid: 0,
      bidAmount: 0,
    },
    {
      id: 6,
      title: '하콩콩이네 상추추',
      currentBid: 0,
      bidAmount: 0,
    },
  ];

  const [auctions, setAuctions] = useState(initialAuctions);

  const handleBidChange = (e, index) => {
    const newAuctions = [...auctions];
    newAuctions[index].bidAmount = Number(e.target.value);
    setAuctions(newAuctions);
  };

  const handleBid = (index) => {
    const newAuctions = [...auctions];
    const bidAmount = newAuctions[index].bidAmount;
    if (bidAmount > newAuctions[index].currentBid) {
      newAuctions[index].currentBid = bidAmount;
      newAuctions[index].bidAmount = 0;
      setAuctions(newAuctions);
      Swal.fire({
        title: `입찰이 성공적으로 이루어졌습니다.`,
        text:`현재 입찰가는 ${bidAmount}원 입니다`,
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
          
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
     
        ;
    } else {
      Swal.fire({
        title: '현재 입찰가보다 높은 금액으로 입찰해주세요.',
        color:  'black',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
        
        ;
    }
  };

  const renderAuctionsInRows = () => {
    const rows = [];
    let currentRow = [];
    auctions.forEach((item, index) => {
      currentRow.push(
        <div className='money' key={item.id} style={{ margin: '10px', width: '300px', textAlign: 'center' ,marginTop:'100px',borderRadius:'10px'}}>
          <h2 className='c3_title'>{item.title}♥</h2>
          <img src={`/img/auction_${item.id}.jpg`} alt={item.title} style={{ width: '230px', height: '200px' ,borderRadius:'0px'}} />
          <p className='c3_moneytitle'>현재 입찰가: {item.currentBid}원</p>
          <input type="number" value={item.bidAmount} onChange={(e) => handleBidChange(e, index)} className='c3_moneyinput'/>
          <button onClick={() => handleBid(index)} className='c3_moneybtn'>입찰하기</button>
        </div>
      );

      if ((index + 1) % 3 === 0 || index === auctions.length - 1) {
        rows.push(
          <div key={index} style={{ display: 'flex', justifyContent: 'center' }}>
            {currentRow}
          </div>
        );
        currentRow = [];
      }
    });
    return rows;
  };

  return (
    <div>
      <ScrollToTop />
      <PageTitle data={'팜팜장터'} num ={'3'}/>
      {renderAuctionsInRows()}
      
    </div>
  );
};

export default Cthree;