import React, { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import Papa from 'papaparse';

function GestureRecognizer({handLandmarks}) {
  const [isTraining, setIsTraining] = useState(false);
  const [trainingStatus, setTrainingStatus] = useState('Upload a dataset to train.');
  const [model, setModel] = useState(null); // Store the model in state for predictions
  const [prediction, setPredictionLabel] = useState("")

  // CSV file upload and data preprocessing
  const handleFileUpload = async (event) => {
    setIsTraining(true);
    setTrainingStatus('Reading and preprocessing data...');
    const file = event.target.files[0];

    try {
      const { features, labels } = await preprocessData(file);
      if (!model) {
        const trainedModel = await trainNewModel(features, labels);
        setModel(trainedModel); // Save the trained model
      }
      setTrainingStatus('Training complete!');
    } catch (error) {
      console.error('Training failed:', error);
      setTrainingStatus('Training failed. Check console for details.');
    } finally {
      setIsTraining(false);
    }
  };

  // Data preprocessing
  const preprocessData = async (file) => {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          const { featuresTensor, labelsTensor } = parseAndNormalizeData(results.data);
          resolve({ features: featuresTensor, labels: labelsTensor });
        },
        error: (error) => reject(error),
        skipEmptyLines: true,
      });
    });
  };

  // Parse CSV data and normalize
  const parseAndNormalizeData = (data) => {
    const labelsMapping = { "PALM": 0, "FIST": 1, "THUMBS_UP": 2, "THUMBS_DOWN": 3, "POINTS_EQUAL": 4 };
    const labels = data.map(row => labelsMapping[row.Label]);
    const features = data.map(row => Object.values(row).slice(0, -1).map(Number));
    const featuresTensor = tf.tensor2d(features);
    const labelsTensor = tf.tensor1d(labels);
    const normalizedFeaturesTensor = normalizeTensor(featuresTensor);
    return { featuresTensor: normalizedFeaturesTensor, labelsTensor };
  };

  // Normalize tensor
  const normalizeTensor = (tensor) => {
    const mean = tensor.mean();
    const std = tensor.sub(mean).square().mean().sqrt();
    return tensor.sub(mean).div(std);
  };

  // Define and train a new model
  const trainNewModel = async (featuresTensor, labelsTensor) => {
    const model = defineModel();
    await model.fit(featuresTensor, labelsTensor, {
      epochs: 50,
      validationSplit: 0.2,
      callbacks: { onEpochEnd: (epoch, logs) => console.log(`Epoch ${epoch + 1}: Loss = ${logs.loss}, Accuracy = ${logs.acc}`) },
    });
    return model;
  };

  // Model architecture
  const defineModel = () => {
    const model = tf.sequential();
    model.add(tf.layers.dense({ inputShape: [63], units: 64, activation: 'relu' }));
    model.add(tf.layers.dense({ units: 32, activation: 'relu' }));
    model.add(tf.layers.dense({ units: 5, activation: 'softmax' }));
    model.compile({ optimizer: 'adam', loss: 'sparseCategoricalCrossentropy', metrics: ['accuracy'] });
    return model;
  };

  // Example prediction function usage
  const handlePredict = async (inputData) => {
    if (!model) return;
    const predictionIndex = await makePrediction(model, inputData);
    const labels = [ 
    "PALM",
    "FIST",
    "THUMBS_UP",
    "THUMBS_DOWN",
    "POINTS_EQUAL"]
    setPredictionLabel(labels[predictionIndex])
    console.log(`Predicted class index: ${predictionIndex} ${labels[predictionIndex]} `);
    // Additional logic to handle prediction result
  };

  // Make a prediction with the model
  async function makePrediction(model, inputData) {
    const preprocessedData = preprocessInputData(inputData); // Ensure inputData is in the correct format
    const prediction = model.predict(preprocessedData);
    const predictionArray = await prediction.array();
    return predictionArray[0].indexOf(Math.max(...predictionArray[0]));
  }

  // Preprocess input data for prediction
  function preprocessInputData(inputData) {
    const inputTensor = tf.tensor2d([inputData]); // Example preprocessing
    return normalizeTensor(inputTensor);
  }

  useEffect(() => {
    try{
      if (model && handLandmarks) {
        console.log("predicting...")
        var featureArray = handLandmarks[0]['landmarks'].flat();
        handlePredict(featureArray);
      }
    }
    catch{

    }
    
  }, [model, handLandmarks]); // Rerun when model or handLandmarks change

  return (
    <div>
      <h2>Gesture Recognizer Training</h2>
      
      <input type="file" onChange={handleFileUpload} disabled={isTraining} accept=".csv" />
      <p>{trainingStatus}</p>

      {prediction}
    </div>
  );
}

export default GestureRecognizer;
