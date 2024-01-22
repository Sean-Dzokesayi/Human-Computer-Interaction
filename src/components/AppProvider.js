import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import * as handpose from '@tensorflow-models/handpose';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [handLandmarks, setHandLandmarks] = useState(null);

  // function to update gestureRecognitionModel
  const updateHandLandmarks = (input) => {
    setHandLandmarks(input)
    
  }

  useEffect(() => {
    // console.log("Hand landmarks updated:", handLandmarks);
  }, [handLandmarks]); 
  

  
  return (
    <AppContext.Provider value={{ handLandmarks, updateHandLandmarks }}>
      {children}
    </AppContext.Provider>
  );
};
