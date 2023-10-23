import React, {useState, useEffect} from 'react'
import './App.css';
import './Components/CalendarDatePick'
import Main from './Main';
import { AllFarm } from './Contexts/FarmContext'
import { AllContent } from './Contexts/ContentContext';
import axios from 'axios';

function App() {

  const [farms, setFarms] = useState([]);
  useEffect(()=>{
    const apiUrl = 'http://192.168.70.237:5022/detail';
    axios.get(apiUrl, { responseType: 'json'})
      .then(response => {
        setFarms(response.data)
        console.log('db로부터받음', response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);



  const [content, setContent] = useState([]);
  useEffect(()=>{
    const apiUrl = 'http://192.168.70.237:5022/content';
    axios.get(apiUrl, { responseType: 'json'})
      .then(response => {
        setContent(response.data)
        console.log('db로부터받음', response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);


  return (
    <AllFarm.Provider value={{farms}} >
      <AllContent.Provider value={{content}}>
        <Main />
      </AllContent.Provider>
    </AllFarm.Provider>
  );
}

export default App;
