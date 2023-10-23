import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import CardDetailsPage from './CardDetailsPage';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useLocation, useNavigate, useParams} from 'react-router-dom'
import { Dialog } from '@mui/material';
import { AllContent } from '../Contexts/ContentContext';
import ScrollToTop from '../ScrollToTop'

const WritingPage = ({ onAddCard, onCancel }) => {
  // const [user_id, setUser_id] = useState('');
  const [showSuccessMessage, setShowSuccessMessage]=useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
  };
  const user_nick = sessionStorage.getItem('user_nick')
  const handleSubmit = () => {
    console.log('보내기클릭');
    const formData = new FormData();
    formData.append('user_nick', user_nick);
    formData.append('content_title', title);
    formData.append('contents', content);
    formData.append('content_img', imageFile);

    const apiUrl = 'http://192.168.70.237:5022/add_content';
    axios.post(apiUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        console.log('Response from server:', response.data);
        if (response.data.message === 'Content added successfully'){
          setShowSuccessMessage(true);
          setTimeout(() => {
            setShowSuccessMessage(false);
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
            
            
            .then((value) =>{
              if(value){
                window.location.reload();
              }
            })
            // 작성 완료 메시지가 표시된 후 화면을 새로고침
             
          }, 10);
        }
      })
      .catch(error => {
        console.error('Error sending data:', error);
      });
  };

  return (
    <div className='writing-page'>
      <ScrollToTop />
      <h1  className='writing_title'>♬ 내 텃밭 자랑하기</h1>
      <input
        className='writetitle'
        type="text"
        placeholder="제목을 작성해주세요."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
       className='write_textarea'
        rows="5"
        placeholder="내용을 작성해주세요."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      
      <input type="file" onChange={handleImageChange} className='photo'/>

      <button onClick={handleSubmit} className='writego'>작성하기</button>
      <button onClick={onCancel} className='writedel'>취소</button>
    </div>
  );
};

const Cone = ({value}) => {
  const [isWriting, setIsWriting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage]=useState(false);
  const [cards, setCards] = useState([]);

  
  const nav = useNavigate();


  const handleCardClick = (cardId) =>{
    nav(`/cardpage/${cardId}`, {state: value})
    console.log('sdkfs;', value)

  }

  const handleAddCard = (newCard) => {
    newCard.id = cards.length + 1; // 새로운 카드의 ID 설정
    setCards([...cards, newCard]); // 새로운 카드 추가
    setIsWriting(false);
    setShowSuccessMessage(true);
  };





//  useEffect(() => {
//   // Flask 서버의 주소
//   const apiUrl = 'http://192.168.70.147:5022/content';
// console.log("test")
//   // Axios를 사용하여 GET 요청 보내기
//   axios.get(apiUrl, { responseType: 'json'})
//     .then(response => {
//        setData(response.data); //요기
//       console.log('db로부터받음', response.data);
//     })
//     .catch(error => {
//       console.error('Error fetching data:', error);
//     });
// }, []);
  const [currentPage, setCurrentPage]=useState(1);
    const postsPerPage =10;
    const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
    };
  
  

  const totalPages = Math.ceil(value.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = value.slice(indexOfFirstPost, indexOfLastPost);
  const user_nick = sessionStorage.getItem('user_nick')
  const writingbtn = ()=>{
    if (user_nick !== null){
      setIsWriting(true)
    } else {
      alert('로그인이 필요한 서비스입니다.')
      nav('/login')
    }
  } 
 
 
 
 
 
  const newlist = currentPosts.map((d)=>{
    return (<tr key={d.content_num} className='card' onClick={() => handleCardClick(d.content_num)}>
    <td className='content_num' style={{textAlign:'center'}}>{d.content_num}</td>
    <td style={{ textAlign: 'left', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',color:'pink' }}>
    <Link  to={`/cardpage/${d.content_num}`}>{d.content_title}</Link></td>
    <td>{d.user_nick}</td>
    <td>{d.content_day}</td>
  </tr>)}   
  )
 
  
  

  const paginationButtons = (
    <div className='pagination'>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        이전
      </button>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        다음
      </button>
    </div>
  );

  

 
  const title = value.map((d)=>d.content_title)
  console.log('title:',title)
  
  return (
    <div>
      <span className='conetitle'>텃밭 자랑하기</span>
    
      <img src='/img/titlebg2.png' className='c1titlebg'/>
     
      {isWriting && (
        <WritingPage
          onAddCard={handleAddCard}
          onCancel={() => setIsWriting(false)}
        />
      )}
      <div className='card-list'>
        <span className='ctexttitle'>게시판</span>
        <table className='card-container'>
          <tbody >
            
            <tr className='c1_column'>
              <th>게시글번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일시</th>
            </tr>

            {newlist}
            {paginationButtons}
            {!isWriting && <button className='write-button' onClick={writingbtn}>작성하기</button>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cone;