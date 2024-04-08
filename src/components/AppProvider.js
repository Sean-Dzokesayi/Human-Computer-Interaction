import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import * as handpose from '@tensorflow-models/handpose';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [handLandmarks, setHandLandmarks] = useState(null);
  const [triggeredGesture, setTriggeredGesture] = useState("")
  const [recognisedGesture, setRecognisedGesture] = useState("")
  const [isMenuDisplayed, setIsMenuDisplayed] = useState(false)
  const [handMotionX, setHandMotionX] = useState()
  const [handMotionY, setHandMotionY] = useState()
  const [focusAreaPage, setFocusAreaPage] = useState("home")
  const [isTraining, setIsTraining] = useState(false)
  const [gotoLinkIntent_link, setGotoLinkIntent_link] = useState("")
  const [openAppName, setOpenAppName] = useState("")
  const [closeAppName, setCloseAppName] = useState("")
  const [jazzOutput, setJazzOutput] = useState("")
  const [transcript, setTranscript] = useState("")
  const [intent, setIntent] = useState("")
  

  const updateRecognisedGesture = (input) => {
    setRecognisedGesture(input)
  }
  const updateIntent = (input) => {
    setIntent(input)
  }
  
  const updateTranscript = (input) => {
    setTranscript(input)
  }

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

  const updateMotionY = (input) => {
    setHandMotionY(input)
  }

  const updateIsMenuDisplayed =  (input) => {
    setIsMenuDisplayed(input)
  }


  function scroll_up(){
    const url = `http://127.0.0.1:5001/scroll_up`;
  
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Assuming the response is in JSON format
      })
      .then(data => {
        // console.log('Response data:', data);
        // Handle the response data here
      })
      .catch(error => {
        // console.error('Error:', error);
        // Handle any errors here
      });
  }

  function scroll_down(){
    const url = `http://127.0.0.1:5001/scroll_down`;
  
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Assuming the response is in JSON format
      })
      .then(data => {
        // console.log('Response data:', data);
        // Handle the response data here
      })
      .catch(error => {
        // console.error('Error:', error);
        // Handle any errors here
      });
  }

  function move_mouse(x, y){
    const url = `http://127.0.0.1:5001/move_mouse`;
  
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({x: x, y: y})
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json(); // Assuming the response is in JSON format
    })
    .then(data => {
      // console.log('Response data:', data);
      // Handle the response data here
    })
    .catch(error => {
      // console.error('Error:', error);
      // Handle any errors here
    });
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


  useEffect(() => {
   if(intent === "Goto Link"){
    if(recognisedGesture === "PALM"){
      scroll_up()
    }
    else if(recognisedGesture === "FIST"){
      scroll_down()
    }
    else if(recognisedGesture === "POINTS_EQUAL"){
      // move_mouse(handMotionX, handMotionY)
    }
    


   }

  }, [handMotionX, handMotionX]);
  
  
  useEffect(() => {
    console.log("Recognised: ", recognisedGesture)
  }, [recognisedGesture])
  
  return (
    <AppContext.Provider value={{ 
      handLandmarks, 
      updateHandLandmarks, 
      updateTriggeredGesture, 
      triggeredGesture, 
      updateRecognisedGesture,
      recognisedGesture,
      isMenuDisplayed, 
      updateIsMenuDisplayed,
      updateMotionX, 
      handMotionX, 
      updateMotionY, 
      handMotionY, 
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
      jazzOutput,
      updateTranscript,
      transcript,
      updateIntent,
      intent
      
      }}>
      {children}
    </AppContext.Provider>
  );
};
