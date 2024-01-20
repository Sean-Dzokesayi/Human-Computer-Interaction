import React, { useState, useEffect } from 'react';
import FocusArea from './components/FocusArea';
import JazzInputText from './components/jazzInputText';
import Sidebar from './components/Sidebar';
import './MainPage.css';
import HandGestureRecognition from './HandGestureRecognition';

function MainPage({ data, handLandmarks, setHandLandmarks }) {


  if(handLandmarks != null){
    // console.log("Landmarks from mainpage : \n", handLandmarks)
  }

  return (
    <div className="MainPage">
      <JazzInputText />

      
      <FocusArea data={data}/>
      <Sidebar handLandmarks={handLandmarks} setHandLandmarks={setHandLandmarks}/>
      {/* <Footer /> */}
    </div>
  );
}

export default MainPage;
