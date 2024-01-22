// Predictor.js
import React, { useState, useEffect } from 'react';
import { preprocessInputData, makePrediction, handlePredict } from './trainingUtil'; // Assume these are moved to a utils file
import { useModel } from './ModelProvider';
import { useAppContext } from './AppProvider'; // Import useModel

function Predictor({ }) {
  const [prediction, setPrediction] = useState("");
  const { gestureRecognitionModel } = useModel();
  

  const { handLandmarks, updateHandLandmarks } = useAppContext();


  const predict  = async (landmarks) => {
    // console.log("Predicting...");
      try {
        const featureArray = landmarks[0]['landmarks'].flat();
        const prediction = await handlePredict(gestureRecognitionModel, featureArray);
        // Assuming labels are defined somewhere accessible
        setPrediction(prediction);
      } catch (error) {
        // console.error("Prediction error:", error);
      }
  }
  useEffect(() => {
    try{
      
      if (gestureRecognitionModel && handLandmarks) {
        predict(handLandmarks)
      }
    }
    catch{

    }
    
  }, [gestureRecognitionModel, handLandmarks]);

  return <div
    style={{
      position: "fixed",
      fontSize: 11,
      fontWeight: 600,
      top: "71%",
      right: "0%", 
      width: "10%",
      backgroundColor: "rgba(255, 255, 255, 0.5)"
      // border: "1px solid red"
      // marginTop: "100%"
    }}
  >{prediction}</div>;
}

export default Predictor;
