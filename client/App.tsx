import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './assets/styles.css'
import Login from './components/login';
import NewLogin from './components/newLogin';
import Home from './components/home';
import Story from "./components/story";
import ReadStory from "./components/readStory";
import Comment from "./components/comments";
import Library from "./components/library";
import StoryCreator from './components/storyCreator';
import { Provider } from'react-redux';
import store from './store';
import './assets/styles.css'

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} /> 
          <Route path="/newLogin" element={<NewLogin />} /> 
          <Route path="/home" element={<Home />} />
          <Route path="/story/:storyId/page/:pageId" element={<ReadStory />} />
          <Route path="/storyCreator" element={<StoryCreator />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;