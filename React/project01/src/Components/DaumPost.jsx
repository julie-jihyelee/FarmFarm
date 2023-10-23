import React from 'react'
import DaumPostCode from 'react-daum-postcode'
import { useState } from 'react';
import useDaumPostcodePopup from 'react-daum-postcode';
import { postcodeScriptUrl } from 'react-daum-postcode/lib/loadPostcode';


const DaumPost = (props) => {
    /**
     * useState
     */
    const [openPostcode, setOpenPostcode] = useState(false);

    /**
     * handler
     */
    const handle = {
        // 버튼 클릭 이벤트
        clickButton: () => {
            setOpenPostcode(current => !current);
        },

        // 주소 선택 이벤트
        selectAddress: (data) => {
            console.log('주소데이터',data)
            // console.log(`
            //     주소: ${data.address},
            //     우편번호: ${data.zonecode}
            // `)
            setOpenPostcode(false);
            props.setForm({...props.form,user_address:data.address})
        },
    }

  

    return (
        <div id={'address'} >
            <button className={"postbtn"} onClick={handle.clickButton}>주소찾기</button>
        
            {openPostcode && 
                <DaumPostCode 
                    onComplete={handle.selectAddress}  // 값을 선택할 경우 실행되는 이벤트
                    autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                    defaultQuery='' 
                    onResize={{width: 500 ,height: 772}}// 팝업을 열때 기본적으로 입력되는 검색어 
                    />}
        </div>
    )
}

export default DaumPost;


// function DaumPost(){
//     //클릭 시 수행될 팝업 생성 함수
//     const open = useDaumPostcodePopup(postcodeScriptUrl);
  
//     const handleComplete = (data) => {
//       let fullAddress = data.address;
//       let extraAddress = ''; //추가될 주소
//       let localAddress = data.sido + ' ' + data.sigungu; //지역주소(시, 도 + 시, 군, 구)
//       if (data.addressType === 'R') { //주소타입이 도로명주소일 경우
//         if (data.bname !== '') {
//           extraAddress += data.bname; //법정동, 법정리
//         }
//         if (data.buildingName !== '') { //건물명
//           extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
//         }
//         //지역주소 제외 전체주소 치환
//         fullAddress = fullAddress.replace(localAddress, '');
//         //조건 판단 완료 후 지역 주소 및 상세주소 state 수정
//         props.setAddressObj({
//           areaAddress: localAddress,
//           townAddress: fullAddress += (extraAddress !== '' ? `(${extraAddress})` : '')
//         });
//         //주소 검색이 완료된 후 결과를 매개변수로 전달
//         // 다음에 수행할 작업을 명시
//       }
//     }
//     //클릭 시 발생할 이벤트
//     const handleClick = () => {
//       //주소검색이 완료되고, 결과 주소를 클릭 시 해당 함수 수행
//         open({onComplete: handleComplete});
//     }
//     return <button type="button" onClick={handleClick}>주소찾기</button>
//    }
  
//   export default DaumPost;