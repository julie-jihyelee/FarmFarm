// utils.js
export function getResizeEventListener(width, height) {
    function handleResize() {
      // 화면 크기가 변경될 때 실행할 로직을 작성하세요.
      console.log(`Window resized to ${window.innerWidth}px x ${window.innerHeight}px`);
      // 예시로 콘솔에 현재 창 크기를 출력하는 로직입니다.
    }
  
    function resizeEventListener() {
      if (window.innerWidth >= width && window.innerHeight >= height) {
        handleResize();
      }
    }
  
    return resizeEventListener;
  }// utils.js
export function calculateSum(a, b) {
    return a + b;
  }
  
 