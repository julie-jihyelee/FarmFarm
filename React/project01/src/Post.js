import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    // Flask 서버의 주소
    const apiUrl = 'http://192.168.0.4:5022/api/data';

    // Axios를 사용하여 POST 요청 보내기
    axios.post(apiUrl, { farm_num: name })
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error('Error sending data:', error);
      });
  };

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
      <div>{message}</div>
    </div>
  );
}

export default App;
