// ModelTrainer.js
import React, { useState } from 'react';
import { preprocessData, trainNewModel } from './trainingUtil'; // Assume these are moved to a utils file
import { useModel } from './ModelContext';

function ModelTrainer({ setModel }) {
  const [isTraining, setIsTraining] = useState(false);
  const [trainingStatus, setTrainingStatus] = useState('Upload a dataset to train model.');
  const { updateGestureModel } = useModel();

  const handleFileUpload = async (event) => {
    setIsTraining(true);
    setTrainingStatus('Reading and preprocessing data...');
    const file = event.target.files[0];

    try {
      const { features, labels } = await preprocessData(file);
      const trainedModel = await trainNewModel(features, labels);
      updateGestureModel(trainedModel); // Update the model in the parent component
      setTrainingStatus('Training complete!');
    } catch (error) {
      console.error('Training failed:', error);
      setTrainingStatus('Training failed. Check console for details.');
    } finally {
      setIsTraining(false);
    }
  };

  return (
    <div>
      <h2>Load Gesture Model</h2>
      <input type="file" onChange={handleFileUpload} disabled={isTraining} accept=".csv" />
      <p>{trainingStatus}</p>
    </div>
  );
}

export default ModelTrainer;
