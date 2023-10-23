// src/store.js
import { createStore } from 'redux';

// 초기 상태
const initialState = {
  currentPageInfo: null, // 현재 페이지 정보를 저장할 상태
};

// 리듀서
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_CURRENT_PAGE':
      return {
        ...state,
        currentPageInfo: action.payload,
      };
    default:
      return state;
  }
}

// 스토어 생성
const store = createStore(rootReducer);

export default store;
