import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [sidos, setSidos] = useState('');
  const [sigungus, setSigungus] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Flask 서버의 주소
    const apiUrl = 'http://192.168.70.147:5022/add';

    // Axios를 사용하여 GET 요청 보내기
    axios.get(apiUrl, { params: { sidos: sidos, sigungus: sigungus } })
      .then(response => {
        setMessage(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [sidos, sigungus]);

  return (
    <div>
      <input
        type="text"
        value={sidos}
        onChange={(e) => setSidos(e.target.value)}
      />
       <input
        type="text"
        value={sigungus}
        onChange={(e) => setSigungus(e.target.value)}
      />
      <div>{message}</div>
    </div>
  );
}

export default App;
