import React, { useState, useEffect, useRef } from 'react';
import { handlePredict } from './trainingUtil';
import { useModel } from './ModelProvider';
import { useAppContext } from './AppProvider';

function Predictor() {
  const [prediction, setPrediction] = useState('');
  const [predictionDuration, setPredictionDuration] = useState(1);
  const lastPredictionRef = useRef('');
  const { gestureRecognitionModel } = useModel();
  const { handLandmarks, updateTriggeredGesture } = useAppContext();
  const actionStop = 3; // Threshold for action

  const processPrediction = async (landmarks) => {
    try {
      const featureArray = landmarks.flat();
      const newPrediction = await handlePredict(
        gestureRecognitionModel,
        featureArray
      );
      if (newPrediction !== lastPredictionRef.current) {
        setPredictionDuration(1); // Reset duration if prediction changes
        lastPredictionRef.current = newPrediction;
      }
      setPrediction(newPrediction);
    } catch (error) {
      console.error('Prediction error:', error);
      setPrediction('');
    }
  };

  useEffect(() => {
    try {
      if (gestureRecognitionModel && handLandmarks) {
        processPrediction(handLandmarks[0]['landmarks']);
      } else {
        setPrediction('');
      }
    } catch {
      setPrediction(null);
    }
  }, [gestureRecognitionModel, handLandmarks]);

  useEffect(() => {
    let intervalId = null;
    let currentDuration = predictionDuration; // Store the current duration
    if (prediction && prediction === lastPredictionRef.current) {
      intervalId = setTimeout(() => {
        if (currentDuration === actionStop) {
          console.log("action stopping")
          updateTriggeredGesture(prediction);
          setPrediction('');
          setPredictionDuration(1); // Reset duration
        } else {
          setPredictionDuration(currentDuration + 1); // Increment duration
        }
      }, 600);
    }

    return () => clearTimeout(intervalId);
  }, [prediction, predictionDuration]);

  return (
    <div
      style={{
        position: 'fixed',
        fontSize: 11,
        fontWeight: 600,
        top: '71%',
        right: '0%',
        width: '10%',
        backgroundColor:
          predictionDuration === actionStop
            ? 'rgba(144, 238, 144, 0.5)'
            : 'rgba(255, 255, 255, 0.5)',
      }}
    >
      {prediction ? `${prediction} ${predictionDuration}s` : 'No gesture detected'}
    </div>
  );
}

export default Predictor;
