import { useEffect, useState } from "react";

// useDetectClose 커스텀 훅
const useDetectClose = (elem, initialState) => {
  // isOpen 상태와 상태를 변경하는 setIsOpen 함수를 useState를 통해 초기값 initialState로 설정
  const [isOpen, setIsOpen] = useState(initialState);

  // useEffect 훅을 사용하여 컴포넌트 렌더링 및 업데이트 시에 실행할 동작 정의
  useEffect(() => {
    // 클릭 이벤트 핸들러 함수 정의
    const onClick = (e) => {
      // elem.current가 null이 아니고 클릭된 요소가 elem.current를 포함하지 않는 경우
      if (elem.current !== null && !elem.current.contains(e.target)) {
        // isOpen 상태를 반전시킴으로써 열림/닫힘 상태를 변경
        setIsOpen(!isOpen);
      }
    };

    // isOpen 상태가 true인 경우에만 클릭 이벤트 리스너를 등록
    if (isOpen) {
      window.addEventListener("click", onClick);
    }

    // cleanup 함수: 컴포넌트 언마운트 시 또는 isOpen이 변경될 때 클릭 이벤트 리스너 제거
    return () => {
      window.removeEventListener("click", onClick);
    };
  }, [isOpen, elem]); // isOpen 상태 또는 elem이 변경될 때마다 이펙트가 재실행

  // isOpen 상태와 isOpen을 변경하는 setIsOpen 함수를 반환
  return [isOpen, setIsOpen];
};

// useDetectClose 커스텀 훅을 외부에서 사용 가능하도록 내보냄
export default useDetectClose;
