import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import * as handpose from '@tensorflow-models/handpose';

const ModelContext = createContext();

export const useModel = () => useContext(ModelContext);

export const ModelProvider = ({ children }) => {
  const [mpHandsModel, setMpHandsModel] = useState(null);
  const [gestureRecognitionModel, setGestureRecognitionModel] = useState(null)

  const modelLoadingRef = useRef(false); // Add this line

  // function to update gestureRecognitionModel
  const updateGestureModel = (model) => {
    setGestureRecognitionModel(model)
    console.log("Global gesture model update")
  }

  useEffect(() => {
    const loadModel = async () => {
      if (!modelLoadingRef.current) { // Check if model is not already loading
        modelLoadingRef.current = true; // Mark as loading
        try {
          console.log('Loading model...');
          const net = await handpose.load();
          console.log('Handpose model loaded.');
          setMpHandsModel(net);
        } catch (error) {
          console.error('Error loading Handpose model:', error);
        }
      }
    };

    if (!mpHandsModel) {
      loadModel();
    }
  }, [mpHandsModel, gestureRecognitionModel]); // Depend on mpHandsModel to prevent reloads

  return (
    <ModelContext.Provider value={{ mpHandsModel, gestureRecognitionModel, updateGestureModel }}>
      {children}
    </ModelContext.Provider>
  );
};
