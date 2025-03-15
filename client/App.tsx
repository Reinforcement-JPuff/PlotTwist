import React from 'react';
import Login from './components/login';
import NewLogin from './components/newLogin';
import Home from './components/home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './assets/styles.css'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="/newLogin" element={<NewLogin />} /> 
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  )
};

export default App;