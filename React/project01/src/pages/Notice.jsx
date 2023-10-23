import React, { useState, useEffect } from 'react';
import axios from 'axios';




const Notice = () => {
  const [notices, setNotices] = useState([
    // 공지사항 데이터
  ]);

  const [selectedNotice, setSelectedNotice] = useState(null);
  const [notice_title, setNotice_title] = useState('');
  const [notice_contents, setNotice_contents] = useState('');
  const [isCreatingNotice, setIsCreatingNotice] = useState(false); // 공지글 작성 페이지 표시 여부 상태

  const [comments, setComments] = useState([]); // 댓글 목록 상태 변수





  const handleNoticeClick = (notice) => {
    if (selectedNotice && selectedNotice.id === notice.id) {
      setSelectedNotice(null);
    } else {
      const apiUrl = `http://192.168.70.237:5022/notice/${notice.id}`;
      axios.get(apiUrl)
        .then(response => {
          setSelectedNotice({
            ...notice,
            content: response.data.notice_contents
          });
        })
        .catch(error => {
          console.error('공지사항 내용 불러오기 에러:', error);
        });
    }
  };

  // const handleNewNotice = () => {
  //   if (newNoticeTitle && newNoticeContent) {
  //     const newNotice = {
  //       id: Date.now(),
  //       title: newNoticeTitle,
  //       content: newNoticeContent,
  //     };
  //     setNotices([...notices, newNotice]);
  //     setNewNoticeTitle('');
  //     setNewNoticeContent('');
  //     setIsCreatingNotice(false); // 공지글 작성 완료 후 작성 페이지 닫기
  //   }
  // };

  const handleDeleteNotice = (noticeId) => {
    const updatedNotices = notices.filter((notice) => notice.id !== noticeId);
    setNotices(updatedNotices);
    setSelectedNotice(null);
  };


  const handleAddComment = () => {
    // if (newComment.trim() !== '') {
  // 서버에 데이터 보내기 : 
    const apiUrl = 'http://192.168.70.237:5022/notice';
    axios.get(apiUrl, { responseType: 'json', params: { notice_title : notice_title , notice_contents : notice_contents } })

    .then(response => {
    console.log('공지사항 받아온거', response.data);
    setComments(response.data)
    })
   .catch(error => {
    console.error('보내기 에러');
    });
  
  };

// 게시물 번호 -> 댓글 데이터 가져오고 -> 뿌려주고

useEffect(()=>{

const apiUrl = 'http://192.168.70.237:5022/notice';
axios.get(apiUrl, { responseType: 'json', params: { notice_title : notice_title , notice_contents : notice_contents } })
.then(response => {

   setNotices(response.data);

  console.log('추후 공지사항에서 받아온 데이터', response.data);

})
.catch(error => {
  console.error('보내기 에러');
});

},[])




















  return (
    <div className="notice-container">
      <h1 className="notice-title">공지사항</h1>
      <div className="notices-list">
        <ul>
          {notices.map((notices) => (
            <li key={notices.id} onClick={() => handleNoticeClick(notices)}>
              💨 {notices.notice_title}
            </li>
          ))}
        </ul>
      </div>
      <div className="notice-details">
        {selectedNotice && (
          <div>
            <h2>{selectedNotice.notice_title}</h2>
            <p>
            {selectedNotice.content.split('\n').map((paragraph, index) => (
                <React.Fragment key={index}>
                  {paragraph}
                  <br />
                </React.Fragment>
              ))}
            </p>
            <button onClick={() => handleDeleteNotice(selectedNotice.id)}>삭제</button>
          </div>
        )}
      </div>
      {isCreatingNotice ? (
        <div className="new-notice">
          <h2>새로운 공지 작성</h2>
          <input
            type="text"
            placeholder="제목"
            value={notice_title}
            onChange={(e) => setNotice_title(e.target.value)}
          />
          <textarea
            placeholder="내용"
            value={notice_contents}
            onChange={(e) => setNotice_contents(e.target.value)}
          />
          <button onClick={handleAddComment}>추가</button>
          <button onClick={() => setIsCreatingNotice(false)}>취소</button>
        </div>
      ) : (
        <button className='noticewrite' onClick={() => setIsCreatingNotice(true)}>공지글 작성하기</button>
      )}
    </div>
  );
};

export default Notice;
