import React from 'react'
import { useNavigate } from 'react-router-dom';
const Body = () => {
  const navigate = useNavigate();

  return (
   <div>
   

    <div className='box'onClick={() => navigate('/register/onlineexam')}>
      <h3>Online Quiz</h3>
      <h5>Click To Register</h5>
    </div>

   


   </div>
  )
}

export default Body