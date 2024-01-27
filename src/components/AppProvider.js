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
  const [isTraining, setIsTraining] = useState(false)
  const [gotoLinkIntent_link, setGotoLinkIntent_link] = useState("")
  const [openAppName, setOpenAppName] = useState("")
  const [closeAppName, setCloseAppName] = useState("")
  const [jazzOutput, setJazzOutput] = useState("")
  
  
  const updateJazzOutput = (input) => {
    setJazzOutput(input)
  }
  const updateCloseAppName = (name) => {
    setCloseAppName(name)
  }
  

  const updateOpenAppName = (name) => {
    setOpenAppName(name)
  }
  const updateGotoLinkIntent_link = (link) => {
    setGotoLinkIntent_link(link)
  }

  const updateFocusAreaPage = (page) => {
    setFocusAreaPage(page)
  }

  const updateIsTraining = (input) => {
    setIsTraining(input)
  }
  // function to update gestureRecognitionModel
  const updateHandLandmarks = (input) => {
    setHandLandmarks(input)
    
  }

  const updateTriggeredGesture = (input) => {
    setTriggeredGesture(input)
  }

  const updateMotionX = (input) => {
    setHandMotionX(input)
  }

  const updateIsMenuDisplayed =  (input) => {
    setIsMenuDisplayed(input)
  }

  useEffect(() => {
    // console.log("Hand landmarks updated:", handLandmarks);
    // console.log("Updated motion ", handMotionX)
    console.log("Is training updated to", isTraining)
  }, [isTraining]); 

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
    <AppContext.Provider value={{ 
      handLandmarks, 
      updateHandLandmarks, 
      updateTriggeredGesture, 
      triggeredGesture, 
      isMenuDisplayed, 
      updateIsMenuDisplayed,
      updateMotionX, 
      handMotionX, 
      updateFocusAreaPage, 
      focusAreaPage, 
      setTriggeredGesture, 
      updateIsTraining,
      isTraining,
      updateGotoLinkIntent_link,
      gotoLinkIntent_link,
      openAppName, 
      updateOpenAppName,
      closeAppName, 
      updateCloseAppName,
      updateJazzOutput, 
      jazzOutput
      
      }}>
      {children}
    </AppContext.Provider>
  );
};
