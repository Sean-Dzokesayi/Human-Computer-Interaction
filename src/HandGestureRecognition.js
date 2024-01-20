// 1. Install dependencies DONE
// 2. Import dependencies DONE
// 3. Setup webcam and canvas DONE
// 4. Define references to those DONE
// 5. Load handpose DONE
// 6. Detect function DONE
// 7. Drawing utilities DONE
// 8. Draw functions DONE

import React, { useRef, useEffect} from "react";
// import logo from './logo.svg';
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import "./App.css";
import { drawHand } from "./utilities";

function HandGestureRecognition({ handLandmarks, setHandLandmarks }) {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const width = 140;
  const height = 140;

  useEffect(() => {
    const runHandpose = async () => {
      try {
        console.log("loading model")
        const net = await handpose.load();
        console.log("Handpose model loaded.");
        // Loop and detect hands
        setInterval(() => {
          detect(net);
        }, 100);
      } catch (error) {
        console.error("Error loading Handpose model:", error);
      }
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
        setHandLandmarks(hand[0]['landmarks'])
        console.log("hand landmarks set");


      }
      catch{
        // console.log("no landmarks")
      }
      
      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      drawHand(hand, ctx);
    }
  };

  return (
    <>
      <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
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
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: width,
            height: height,
            // display: "none"
          }}
        />
    </>
  );
}

export default HandGestureRecognition;
