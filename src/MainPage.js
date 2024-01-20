import React, { useState, useEffect } from 'react';
import FocusArea from './components/FocusArea';
import JazzInputText from './components/jazzInputText';
import Sidebar from './components/Sidebar';
import './MainPage.css';
import HandGestureRecognition from './HandGestureRecognition';

function MainPage({ data }) {


  return (
    <div className="MainPage">
      <JazzInputText />

      <HandGestureRecognition />
      {/* <FocusArea data={data}/> */}
      {/* <Sidebar /> */}
      {/* <Footer /> */}
    </div>
  );
}

export default MainPage;
