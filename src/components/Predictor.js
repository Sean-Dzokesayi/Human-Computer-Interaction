// Predictor.js
import React, { useState, useEffect } from 'react';
import { preprocessInputData, makePrediction, handlePredict } from './trainingUtil'; // Assume these are moved to a utils file
import { useModel } from './ModelContext';


function Predictor({ handLandmarks }) {
  const [prediction, setPrediction] = useState("");
  const { gestureRecognitionModel } = useModel();

  const predict  = async () => {
    // console.log("Predicting...");
      try {
        const featureArray = handLandmarks[0]['landmarks'].flat();
        const prediction = await handlePredict(gestureRecognitionModel, featureArray);
        // Assuming labels are defined somewhere accessible
        setPrediction(prediction);
      } catch (error) {
        // console.error("Prediction error:", error);
      }
  }
  useEffect(() => {
    if (gestureRecognitionModel && handLandmarks) {
      predict()
    }
  }, [gestureRecognitionModel, handLandmarks]);

  return <div>Prediction: {prediction}</div>;
}

export default Predictor;
