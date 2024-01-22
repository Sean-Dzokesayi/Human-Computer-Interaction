import * as tf from '@tensorflow/tfjs';

export async function trainClassificationModel(data) {
  console.log("Training model from array data");

  // Extract features and labels
  let features = data.map(entry => entry.slice(0, -1)); // All but the last element
  const labels = data.map(entry => entry[entry.length - 1]); // Last element

  // Convert labels to one-hot encoding
  const uniqueLabels = [...new Set(labels)]; // Extract unique labels for encoding
  const labelMapping = uniqueLabels.reduce((acc, label, index) => {
    acc[label] = index;
    return acc;
  }, {});
  const oneHotLabels = labels.map(label => {
    const oneHot = new Array(uniqueLabels.length).fill(0);
    oneHot[labelMapping[label]] = 1;
    return oneHot;
  });

  // Split the data into training and testing sets
  const splitIndex = Math.floor(features.length * 0.8); // 80% for training
  const xTrain = features.slice(0, splitIndex);
  const yTrain = oneHotLabels.slice(0, splitIndex);
  const xTest = features.slice(splitIndex);
  const yTest = oneHotLabels.slice(splitIndex);

  // Define the model
  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 64, activation: 'relu', inputShape: [features[0].length] }));
  model.add(tf.layers.dense({ units: uniqueLabels.length, activation: 'softmax' }));

  // Compile the model
  model.compile({
    loss: 'categoricalCrossentropy',
    optimizer: 'adam',
    metrics: ['accuracy']
  });

  // Train the model
  await model.fit(tf.tensor2d(xTrain), tf.tensor2d(yTrain), {
    epochs: 50,
    batchSize: 32,
  });
  console.log('Training complete.');

  // Evaluate the model
  const evaluation = model.evaluate(tf.tensor2d(xTest), tf.tensor2d(yTest));
  const testAccuracy = await evaluation[1].data().then(data => data[0]);
  console.log(`Test accuracy: ${testAccuracy * 100}%`);
  saveAndDownloadModel(model).then(() => {
    console.log("download initiated");
  });

  return model;
}

async function saveAndDownloadModel(model) {
  // Save the model as a JSON file
  const modelJSON = model.toJSON();
  const modelJSONBlob = new Blob([JSON.stringify(modelJSON)], { type: 'application/json' });
  const modelJSONURL = URL.createObjectURL(modelJSONBlob);

  // Create an anchor link for downloading the model.json file
  const aJSON = document.createElement('a');
  aJSON.style.display = 'none';
  aJSON.href = modelJSONURL;
  aJSON.download = 'model.json';
  document.body.appendChild(aJSON);
  aJSON.click();

  // Clean up
  URL.revokeObjectURL(modelJSONURL);
  document.body.removeChild(aJSON);

  // Save the weights as binary data
  const weightsBlob = await model.save('downloads://my-model');
}

// Call trainClassificationModel with your data here
// trainClassificationModel(yourData);
