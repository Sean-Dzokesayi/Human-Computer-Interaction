import React, { useState, useEffect } from 'react';
import FocusArea from './FocusArea';
import JazzInputText from './jazzInputText';
import Sidebar from './Sidebar';
import './MainPage.css';
import HandGestureRecognitionMin from './HandGestureRecognitionMin';

function MainPage({ data, handLandmarks, setHandLandmarks }) {


  const [isTraining, setIsTraining] = useState(false);
  if(handLandmarks != null){
    // console.log("Landmarks from mainpage : \n", handLandmarks)
  }

  return (
    <div className="MainPage">
      <JazzInputText />

      
      <FocusArea handLandmarks={handLandmarks} setHandLandmarks={setHandLandmarks} isTraining={isTraining} setIsTraining={setIsTraining}
        />

      <Sidebar handLandmarks={handLandmarks} setHandLandmarks={setHandLandmarks} isTraining={isTraining} setIsTraining={setIsTraining}/>
      {/* <Footer /> */}
    </div>
  );
}

export default MainPage;
