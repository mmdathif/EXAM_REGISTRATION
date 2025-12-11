

import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import Head from './Components/MainComponent/Header.jsx';
import Body from './Components/MainComponent/Body.jsx';
import Footer from './Components/MainComponent/Footer.jsx';
import Signin from './Components/Login/Signin.jsx';
import OnlineExam from './Components/Form/OnlineExam.jsx';
import Quiz from './Components/Quiz/Quiz.jsx'; // or your actual path
import Signup from './Components/Login/Signup.jsx';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Head />
      <Routes>
        {/* Default route goes to login */}
        <Route path="/" element={<Signin setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<Signup />} />
        {/* Protected route */}
        <Route
          path="/home"
          element={
            isAuthenticated ? <Body /> : <Navigate to="/" replace />
          }
        />
        <Route path="/register/onlineexam" element={<OnlineExam />} /> 
        <Route path="/quiz/:username" element={<Quiz />} />


      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

