import React, { useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as trainingUtil from '../trainingUtil';

async function predictLabel(inputData, model) {
  if (!model) {
    console.error('Model is not loaded');
    return;
  }

  // Assuming inputData is a flat array of numbers corresponding to your model's input shape
  // Reshape inputData to match the model's input shape, e.g., [1, numberOfFeatures]
  const tensorInput = tf.tensor2d([inputData]);
  const prediction = model.predict(tensorInput);

  // Assuming your model outputs a softmax probability distribution
  const predictedIndex = prediction.argMax(1).dataSync()[0];

  // Map the index of the highest probability to a label
  // Ensure you have an array or dictionary mapping indexes to labels
  const labels = [
    "PALM",
    "FIST",
    "THUMBS_UP",
    "THUMBS_DOWN",
    "POINTS_EQUAL"
  ]; 
  const predictedLabel = labels[predictedIndex];

  return predictedLabel;
}


function ModelLoader({handLandmarks}) {
  const [model, setModel] = useState(null);
  const [predictedLabel, setPredictedLabel] = useState("")

  const handleLoadModel = async (event) => {
    event.preventDefault();
    const jsonUpload = document.getElementById('upload-json');
    const weightsUpload = document.getElementById('upload-weights');
    
    if (jsonUpload.files.length === 0 || weightsUpload.files.length === 0) {
      alert('Please upload both the model.json file and the weights files.');
      return;
    }

    try {
      const loadedModel = await tf.loadLayersModel(tf.io.browserFiles([jsonUpload.files[0], ...weightsUpload.files]));
      setModel(loadedModel);
      console.log('Model loaded successfully');
      // Model is now loaded and can be used.
      

    } catch (error) {
      console.error('Model loading failed', error);
      alert('Failed to load the model. Check the console for details.');
    }
  };

  if(model !== null){
    try{

      // console.log("making predictions")

      // Add the arrays for each landmark to one extended array
      var snapshot = []
      handLandmarks[0]['landmarks'].forEach(landmark => {
        landmark[0] = parseInt(landmark[0])
        landmark[1] = parseInt(landmark[1])
        landmark[2] = parseInt(landmark[2])
        snapshot = snapshot.concat(landmark)
      });

      console.log("Predicting Data...");

      predictLabel(snapshot, model)
        .then(result => {
          console.log("Prediction Data", result);
          if(predictLabel !== result){
            setPredictedLabel(result)
          }
          
        })
        .catch(error => {
          console.error("Prediction Error", error);
        });

      
      
      
      // setPredictedLabel(predictLabel(snapshot, model))
    }
    catch{

    }
    
  }

  return (
    <div>



      <form onSubmit={handleLoadModel}>
        <label htmlFor="upload-json">Upload model.json file:</label>
        <input type="file" id="upload-json" accept=".json" required />
        <br />
        <label htmlFor="upload-weights">Upload model weights files:</label>
        <input type="file" id="upload-weights" accept=".bin" multiple required />
        <br />
        <button type="submit">Load Model</button>
      </form>
      {model ? <p>Model loaded successfully!</p> : null}


      <p>{predictedLabel}</p>
    </div>
  );
}

export default ModelLoader;
