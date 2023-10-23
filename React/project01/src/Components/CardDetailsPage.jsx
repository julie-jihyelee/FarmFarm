import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


const CardDetailsPage = ({ value }) => {
  console.log('detail:',value)

  const data = value;

  // const cardDetail = data.filter()
  const { cardId } = useParams();
  const navigate = useNavigate();
  // const selectedCard = cards.find((card) => card.id === parseInt(cardId));
  console.log('check해보자',cardId);
  //  console.log('sd:'selectedCard)
  // if (!selectedCard) {
  //   return <div> </div>;
  // }

  // 사용자 정보 가져오기
  const userNick = sessionStorage.getItem('user_nick')
  const userId = sessionStorage.getItem('user_id')


  const newContent = data.filter((c)=>c.content_num === Number(cardId));

  console.log('글:',newContent[0].content_title)
   const handleGoBackToList = () => {
     navigate('/cone');
   };

  const [showSuccessMessage, setShowSuccessMessage]=useState(false);
   const [comments, setComments] = useState([]); // 댓글 목록 상태 변수
   const [newComment, setNewComment] = useState('');

   const handleAddComment = () => {

      if (userNick === null){
        alert('로그인이 필요한 서비스입니다.')
        
      } else {
        if (newComment.trim() !== '') {
          // setComments([...comments, newComment]); // 새 댓글을 댓글 목록에 추가
          // setNewComment(''); // 새 댓글 내용 초기화

          // 서버에 데이터 보내기 : 
          const apiUrl = 'http://192.168.70.237:5022/content_comment';
          axios.get(apiUrl, { responseType: 'json', params: { user_nick : userNick , content_num : newContent[0].content_num, content_comment : newComment } })
          .then(response => {
            console.log('댓글쓰고 받아온거', response.data);
            setComments(response.data);
            setNewComment('');
          })
          .catch(error => {
            console.error('보내기 에러');
          });
        }
      }
    } 
  
  
  // 게시물 번호 -> 댓글 데이터 가져오고 -> 뿌려주고
  
  useEffect(()=>{
  
    const apiUrl = 'http://192.168.70.237:5022/content_comment';
    axios.get(apiUrl, { responseType: 'json', params: { user_nick : userNick , content_num : newContent[0].content_num, content_comment : newComment } })
    .then(response => {

      setComments(response.data);

      console.log('댓글 처음에 받아온 데이터', response.data);

    })
    .catch(error => {
      console.error('보내기 에러');
    });

  },[])
  
  const del = () => {
    if (userNick === newContent[0].user_nick) {
      const delUrl = 'http://192.168.70.237:5022/delete';
      axios
        .get(delUrl, { responseType: 'json', params: { content_num: newContent[0].content_num } })
        .then(response => {
          console.log('Response from server:', response.data);
          if (response.data.message === 'success') {
            setShowSuccessMessage(true);
            // 여기서 바로 리디렉션을 수행
            setTimeout(() => {
              setShowSuccessMessage(false);
              alert('게시물이 삭제되었습니다.');
              // 작성 완료 메시지가 표시된 후 cone 페이지로 이동
              window.location.href = 'http://localhost:3000/cone'; // 이동할 페이지 URL로 변경
            }, 10);
          } else {
            alert('본인이 작성한 글이 아닙니다.');
          }
        })
        .catch(error => {
          console.error('Error sending data:', error);
          alert('삭제 중 오류가 발생했습니다.');
        });
    }
  };
  

  
  return (
    <div className='infopage'>
    <span className='infotitle'>텃밭 자랑하기</span>
    <img src='/img/titlebg2.png' className='infotitle_bg'/>
  
    <div className='card-details-container'>
      
      <div className='card-details'>
      
        
        <h2 className='card-details-title'>{newContent[0].content_title}</h2>
        <div></div>
        <span className='card-nickname'>작성자 : {newContent[0].user_nick} </span>
        <div className='asdf'></div>
        <p className='card-details-content'>{newContent[0].contents}</p>
        <img className='card-details-image' src={`http://192.168.70.237:5022/content_img/${newContent[0].content_img}`} alt={newContent[0].content_title} />
        
         <div className='card-details-buttons'>
          <button className='card-details-button-delete' onClick={del}>삭제</button>
          <button className='card-details-button-list' onClick={handleGoBackToList}>목록</button>
        </div> 
      </div>
      
      
      <div className='comment-list'>
        <h3 className='comment_list'>댓글</h3>
        <ul>
          {comments?.map((comment, index) => (
            
            <li key={index}>
              <div className='commentnick'>{comment.user_nick}</div><div>{comment.content_comment}</div><div className='commentday'>{comment.content_comment_day}</div>
              </li>
            
          ))}
        </ul>

      
        </div>
        <textarea
      className='comment_area'
        placeholder='댓글을 작성하세요'
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button onClick={handleAddComment} className='comment_btn'>댓글작성하기</button>
      </div>  
      </div>
    
  );
};

export default CardDetailsPage;