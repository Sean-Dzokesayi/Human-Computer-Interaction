import * as tf from '@tensorflow/tfjs';


export default function trainClassificationModel(data) {
  // Extract features and labels from the data
  const features = data.map((entry) => entry.slice(0, entry.length - 1));
  const labels = data.map((entry) => entry[entry.length - 1]);

  // Convert labels to one-hot encoding
  const uniqueLabels = [...new Set(labels)];
  const labelMapping = {};
  uniqueLabels.forEach((label, index) => {
    labelMapping[label] = index;
  });

  const oneHotLabels = labels.map((label) => {
    const oneHot = new Array(uniqueLabels.length).fill(0);
    oneHot[labelMapping[label]] = 1;
    return oneHot;
  });

  // Split the data into training and testing sets
  const split = 0.8; // 80% for training, 20% for testing
  const splitIndex = Math.floor(features.length * split);
  const xTrain = features.slice(0, splitIndex);
  const yTrain = oneHotLabels.slice(0, splitIndex);
  const xTest = features.slice(splitIndex);
  const yTest = oneHotLabels.slice(splitIndex);

  // Define a simple neural network model
  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 64, activation: 'relu', inputShape: [3] }));
  model.add(tf.layers.dense({ units: uniqueLabels.length, activation: 'softmax' }));

  // Compile the model
  model.compile({ loss: 'categoricalCrossentropy', optimizer: 'adam', metrics: ['accuracy'] });

  // Train the model
  const epochs = 50;
  const batchSize = 32;
  model.fit(tf.tensor(xTrain), tf.tensor(yTrain), {
    epochs,
    batchSize,
  }).then((history) => {
    console.log('Training complete.');
    // Evaluate the model
    model.evaluate(tf.tensor(xTest), tf.tensor(yTest)).then((result) => {
      console.log(`Test accuracy: ${result[1].dataSync()[0] * 100}%`);
    });
  });

  return model;
  }

// // Load data from a CSV file
// const data = [];
// fs.createReadStream('gestures.csv')
//   .pipe(csv())
//   .on('data', (row) => {
//     data.push(row);
//   })
//   .on('end', () => {
//     const trainedModel = trainClassificationModel(data);
//   });