
import React from 'react'
import '../Css/FarmDetail.css'
import FindDetail from '../Components/FindDetail'
import Footer from '../Components/Footer';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const FarmDetail = () => {
 
  return (
    <div>
      <FindDetail />
      <Footer />
    </div>
  )
}

export default FarmDetail