import React, { useRef, useEffect} from "react";
// import logo from './logo.svg';
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import "./App.css";
import { drawHand } from "../utilities";


function HandGestureRecognitionMax({ handLandmarks, setHandLandmarks, width = null, height = null }) {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  if(width == null){
    width = 120;
    height = 120;
  }


  useEffect(() => {
    const runHandpose = async () => {
      let net = null;
      while (net === null) {
        try {
          console.log("Loading model...");
          net = await handpose.load();
          console.log("Handpose model loaded.");
        } catch (error) {
          console.error("Error loading Handpose model:", error);
          // Wait for a while before trying again
          await new Promise((resolve) => setTimeout(resolve, 2000));
        }
      }

      // Once the model is loaded, start detecting hands
      setInterval(() => {
        detect(net);
      }, 100);
    };

    runHandpose();
  }, []); // Empty dependency array ensures this runs only once on component mount


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
        setHandLandmarks(hand)
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

    <>
    <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            // marginLeft: "auto",
            // marginRight: "auto",
            left: "50%",
            top: "21.5%",
            textAlign: "center",
            zindex: 9,
            width: width,
            height: height,
            // display: "hidden"
          }}
        />
      <div>
      
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            // marginLeft: "auto",
            // marginRight: "auto",
            left: "50%",
            top: "26.4%",
            textAlign: "center",
            zindex: 9,
            width: width,
            height: 345,
            // border:"2px solid black"
            // display: "none"
          }}
        />

        
    </div>
    </>
  );
}

export default HandGestureRecognitionMax;
