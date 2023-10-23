import React, {useState, useEffect, useRef} from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import '../Header.css'

const Header = () => {
  // 하위 메뉴 이벤트 
  const dropDownRef = useRef(null);
  const [activeMenu, setActiveMenu] = useState(null);

  const handleMenuClick = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const handleOutsideClick = (e) => {
    if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
      setActiveMenu(null);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);


   // 로그인 상태에 따라 접근 권한 다르게 하기 
   const nav = useNavigate();
   const [user, setUser] = useState('');

   const authenticated = user != null;
   
   useEffect (()=>{
     setUser(sessionStorage.getItem('user_id'))
     console.log('로그인확인:',user)
   },[])
 
   //로그아웃 하기
   const Logout = (e)=>{
     sessionStorage.removeItem('user_id')
     sessionStorage.removeItem('user_nick')
     sessionStorage.removeItem('user_type')
     setUser(null)
     Swal.fire({
      position: 'center',
      icon: 'success',
      title: '로그아웃 되었습니다.',
      showConfirmButton: false,
      timer: 1500
    })
   }
 
   const JoinAlert = () =>{
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: '이미 로그인된 상태입니다.',
      showConfirmButton: false,
      timer: 1500
    })
   }

   const LoginAlert = () =>{
    Swal.fire({
      position: 'center',
      icon: 'info',
      title: '로그인이 필요합니다!',
      showConfirmButton: false,
      timer: 1500
    })
   
   }


  return (
    <div className='main_col' >
      <div className='main_grid'>
        <NavLink to={'/'} className='logo'>
          <img src="img/logo.png" alt="Logo" />
        </NavLink>

        <div className='navbar1'>
          {authenticated ? 
            <NavLink to={'/'} id='navbarlogin' onClick={Logout}>로그아웃</NavLink>:
            <NavLink to={'/login'} id='navbarlogin'>로그인</NavLink>}
          {authenticated ? 
            <NavLink to={''} id='navbarlogin' onClick={JoinAlert}>회원가입</NavLink> :
            <NavLink to={'/join'} id='navbarlogin'>회원가입</NavLink>
          }
          
        </div>

        <div className='navbar'>
          <ul ref={dropDownRef} className={`menu ${activeMenu ? 'active' : ''}`}>
            <NavLink to ='/find'
              className='navbarMenu'
              activeClassName='activeLink'
              onClick={() => handleMenuClick('find')}
            >
              텃밭 검색
            </NavLink>
            {/* {activeMenu === 'find' && (
              <div className='navbarSubMenu1'>
                <NavLink to='/find' className='navbarSubMenuLink'>
                  텃밭 검색
                </NavLink>
              </div>
            )} */}
            {authenticated ? 
              <NavLink to='/out'
                className='navbarMenu'
                activeClassName='activeLink'
                onClick={() => handleMenuClick('out')}
              >
                텃밭내놓기
              </NavLink>
               :
              <NavLink to = '/login'
              className='navbarMenu'
              activeClassName='activeLink'
              onClick={LoginAlert}
              >
                텃밭내놓기
              </NavLink> }

            {/* {activeMenu === 'out' && (
              <div className='navbarSubMenu2'>
                <NavLink to='/out' className='navbarSubMenuLink'>
                  텃밭 등록
                </NavLink>
              </div>
            )} */}
            <NavLink
              className='navbarMenu'
              activeClassName='activeLink'
              onClick={() => handleMenuClick('community')}
            >
              커뮤니티
            </NavLink>
            {activeMenu === 'community' && (
              <div className='navbarSubMenu3'>
                <NavLink to='/community' className='navbarSubMenuLink'>
                  정보게시판
                </NavLink>
                <br/><br/>
                <NavLink to='/machin' className='navbarSubMenuLink'>
                  작물가격예측
                </NavLink>
              </div>
            )}
            {authenticated ? 
              <NavLink
                className='navbarMenu'
                activeClassName='activeLink'
                onClick={() => handleMenuClick('mypage')}
              >
                마이페이지
              </NavLink> 

              :
              <NavLink to = '/login'
              className='navbarMenu'
              activeClassName='activeLink'
              onClick={LoginAlert}
            >
              마이페이지
              </NavLink> 
            }

            {activeMenu === 'mypage' && (
              <div className='navbarSubMenu4'>
                <NavLink to='/mypage/mylist' className='navbarSubMenuLink'>
                  문의 내역
                </NavLink>
                <br/>
                <br/>
                <NavLink to='/mypage/info' className='navbarSubMenuLink'>
                  내 정보 수정
                </NavLink>
              </div>
            )} 

          </ul>
        </div>  
      </div>
    </div>
  )
}

export default Header