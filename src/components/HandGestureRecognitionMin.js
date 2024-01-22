import React, { useRef, useEffect} from "react";
// import logo from './logo.svg';
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import "./App.css";
import { drawHand } from "../utilities";
import { useModel } from './ModelProvider'; // Import useModel
import { useAppContext } from './AppProvider'; // Import useModel


function HandGestureRecognitionMin({ width = null, height = null }) {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const { mpHandsModel } = useModel();
  const { handLandmarks, updateHandLandmarks  } = useAppContext();



  if(width == null){
    width = 140;
    height = 140;
  }

  useEffect(() => {
    const runHandpose = async () => {
      setInterval(() => {        
        if(mpHandsModel){
          detect(mpHandsModel);
        }
      }, 100);
    };

    runHandpose();
  }, [mpHandsModel]); // Empty dependency array ensures this runs only once on component mount


  const detect = async (net) => {
    
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const hand = await net.estimateHands(video);
      try{
        updateHandLandmarks(hand)
        // console.log(hand)
      }
      catch{
        // console.log("no landmarks")
      }
      
      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      // Set the background color
      ctx.fillStyle = "#D9D9D9";
      ctx.fillRect(0, 0, videoWidth, videoHeight);

      drawHand(hand, ctx, videoWidth, videoHeight);
    }
  };

  return (
    <div>
      <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            // marginLeft: "auto",
            // marginRight: "auto",
            left: 1,
            textAlign: "center",
            zindex: 9,
            width: width,
            height: height,
            // display: "hidden"
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            // marginLeft: "auto",
            // marginRight: "auto",
            left: 1,
            textAlign: "center",
            zindex: 9,
            width: width,
            height: height,
            // display: "none"
            // border: "1px solid red"
          }}
        />

        
    </div>
  );
}

export default HandGestureRecognitionMin;
