import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './assets/styles.css'
import Login from './components/login';
import NewLogin from './components/newLogin';
import Home from './components/home';
import Story from "./components/story";
import readStory from "./components/readStory";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="/newLogin" element={<NewLogin />} /> 
        <Route path="/home" element={<Home />} />
        <Route path="/story" element={<Story />} />
        <Route path="/read" element={<readStory />} />
      </Routes>
    </Router>
  )
};

export default App;