import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import * as handpose from '@tensorflow-models/handpose';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [handLandmarks, setHandLandmarks] = useState(null);
  const [triggeredGesture, setTriggeredGesture] = useState("")
  const [isMenuDisplayed, setIsMenuDisplayed] = useState(false)
  const [handMotionX, setHandMotionX] = useState()
  const [focusAreaPage, setFocusAreaPage] = useState("home")


  const updateFocusAreaPage = (page) => {
    setFocusAreaPage(page)
  }

  // function to update gestureRecognitionModel
  const updateHandLandmarks = (input) => {
    setHandLandmarks(input)
    
  }

  const updateTriggeredGesture = (input) => {
    // console.log("Triggered ", input)
    setTriggeredGesture(input)


    // if(triggeredGesture === "POINTS_EQUAL"){
    //   setIsMenuDisplayed(!isMenuDisplayed)
    //   setTriggeredGesture('')
    // }
  }

  const updateMotionX = (input) => {
    setHandMotionX(input)
  }


  useEffect(() => {
    // console.log("Hand landmarks updated:", handLandmarks);
    // console.log("Updated motion ", handMotionX)
  }, [handLandmarks, handMotionX]); 

  useEffect(() => {
    if (triggeredGesture === "POINTS_EQUAL") {
      let timeoutId = setTimeout(() => {
        setIsMenuDisplayed(!isMenuDisplayed);
        setTriggeredGesture("");
      }, 0); 
  
      return () => clearTimeout(timeoutId); // Cleanup the timeout on component unmount or when "POINTS_EQUAL" changes
    }
  }, [triggeredGesture]);
  
  

  
  return (
    <AppContext.Provider value={{ handLandmarks, updateHandLandmarks, updateTriggeredGesture, triggeredGesture, isMenuDisplayed, updateMotionX, handMotionX, updateFocusAreaPage, focusAreaPage }}>
      {children}
    </AppContext.Provider>
  );
};
