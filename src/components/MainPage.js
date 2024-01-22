import React, { useState, useEffect } from 'react';
import FocusArea from './FocusArea';
import JazzInputText from './jazzInputText';
import Sidebar from './Sidebar';
import './MainPage.css';
import HandGestureRecognitionMin from './HandGestureRecognitionMin';


function MainPage({  }) {

  const [isTraining, setIsTraining] = useState(false);

  return (
    <div className="MainPage">
      <JazzInputText />

      
      <FocusArea />

      <Sidebar />
      {/* <Footer /> */}
    </div>
  );
}

export default MainPage;
