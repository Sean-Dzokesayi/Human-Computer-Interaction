import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as handpose from '@tensorflow-models/handpose';

const ModelContext = createContext();

export const useModel = () => useContext(ModelContext);

export const ModelProvider = ({ children }) => {
  const [mpHandsModel, setMpHandsModel] = useState(null);
  const [gestureRecognitionModel, setGestureRecognitionModel] = useState(null);

  const modelLoadingRef = useRef(false);

  useEffect(() => {
    // Load the handpose model
    const loadHandPoseModel = async () => {
      if (!modelLoadingRef.current) {
        modelLoadingRef.current = true;
        try {
          console.log('Loading handpose model...');
          const net = await handpose.load();
          console.log('Handpose model loaded.');
          setMpHandsModel(net);
        } catch (error) {
          console.error('Error loading handpose model:', error);
        }
      }
    };

    if (!mpHandsModel) {
      loadHandPoseModel();
    }

    // Load the gesture recognition model from storage if it's null
    const loadGestureModelFromStorage = async () => {
      if (gestureRecognitionModel === null) {
        try {
          console.log('Loading gesture recognition model from storage...');
          // Make sure this path matches exactly the path used when saving the model
          const storedModel = await tf.loadLayersModel('indexeddb://my-gesture-model');
          console.log('Gesture recognition model loaded from storage.');
          setGestureRecognitionModel(storedModel);
        } catch (error) {
          console.error('Error loading gesture recognition model from storage:', error);
        }
      }
    };
    

    loadGestureModelFromStorage();
  }, [mpHandsModel]); // This effect depends on mpHandsModel to ensure handpose model is loaded first

  return (
    <ModelContext.Provider value={{ mpHandsModel, gestureRecognitionModel, updateGestureModel: setGestureRecognitionModel }}>
      {children}
    </ModelContext.Provider>
  );
};
