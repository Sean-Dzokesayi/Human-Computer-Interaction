import Papa from 'papaparse';
import * as tf from '@tensorflow/tfjs';

 
 // Data preprocessing
export const preprocessData = async (file) => {
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
export const parseAndNormalizeData = (data) => {
  const labelsMapping = { "PALM": 0, "FIST": 1, "THUMBS_UP": 2, "THUMBS_DOWN": 3, "POINTS_EQUAL": 4 , "Click": 5};
  // const labelsMapping = { "PALM": 0, "Click": 1};
  const labels = data.map(row => labelsMapping[row.Label]);
  const features = data.map(row => Object.values(row).slice(0, -1).map(Number));
  const featuresTensor = tf.tensor2d(features);
  const labelsTensor = tf.tensor1d(labels);
  const normalizedFeaturesTensor = normalizeTensor(featuresTensor);
  return { featuresTensor: normalizedFeaturesTensor, labelsTensor };
};

// Normalize tensor
export const normalizeTensor = (tensor) => {
  const mean = tensor.mean();
  const std = tensor.sub(mean).square().mean().sqrt();
  return tensor.sub(mean).div(std);
};

// Define and train a new model
export const trainNewModel = async (featuresTensor, labelsTensor) => {
  const model = defineModel();
  await model.fit(featuresTensor, labelsTensor, {
    epochs: 10,
    validationSplit: 0.2,
    callbacks: { onEpochEnd: (epoch, logs) => console.log(`Epoch ${epoch + 1}: Loss = ${logs.loss}, Accuracy = ${logs.acc}`) },
  });
  return model;
};

// Model architecture
export const defineModel = () => {
  const model = tf.sequential();
  model.add(tf.layers.dense({ inputShape: [63], units: 64, activation: 'relu' }));
  model.add(tf.layers.dense({ units: 32, activation: 'relu' }));
  model.add(tf.layers.dense({ units: 6, activation: 'softmax' }));
  model.compile({ optimizer: 'adam', loss: 'sparseCategoricalCrossentropy', metrics: ['accuracy'] });
  return model;
};

// Example prediction function usage
export const handlePredict = async (model, inputData) => {
  if (!model) return;
  const predictionIndex = await makePrediction(model, inputData);
  const labels = [ 
  "PALM",
  "FIST",
  "THUMBS_UP",
  "THUMBS_DOWN",
  "POINTS_EQUAL",
  "Click"]
  // console.log(`Predicted class index: ${predictionIndex} ${labels[predictionIndex]} `);
  return labels[predictionIndex]
  // Additional logic to handle prediction result
};

// Make a prediction with the model
export async function makePrediction(model, inputData) {
  const preprocessedData = preprocessInputData(inputData); // Ensure inputData is in the correct format
  const prediction = model.predict(preprocessedData);
  const predictionArray = await prediction.array();
  // console.log("Prediction output", predictionArray);

  // Find the index of the maximum prediction score
  const predictedIndex = predictionArray[0].indexOf(Math.max(...predictionArray[0]));
  
  // Get the prediction score (confidence level) for the predicted class
  let predictedConfidence = predictionArray[0][predictedIndex];
  predictedConfidence = (predictedConfidence * 100).toFixed(2)

  // console.log(`Predicted class index: ${predictedIndex}, Confidence: ${predictedConfidence}%`);

  // if(predictedConfidence < 80){
  //   return -1 
  // }
  return predictedIndex;
}


// Preprocess input data for prediction
export function preprocessInputData(inputData) {
  const inputTensor = tf.tensor2d([inputData]); // Example preprocessing
  return normalizeTensor(inputTensor);
}