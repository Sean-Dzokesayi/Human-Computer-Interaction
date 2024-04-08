import React, { useRef, useEffect} from "react";
// import logo from './logo.svg';
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import "./App.css";
import { drawHand } from "../utilities";
import { useModel } from './ModelProvider'; // Import useModel
import { useAppContext } from './AppProvider'; // Import useModel
import { Button } from "bootstrap";


function HandGestureRecognitionMin({ width = null, height = null }) {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const { mpHandsModel } = useModel();
  const { handLandmarks, updateHandLandmarks, updateMotionX, updateMotionY, updateFocusAreaPage  } = useAppContext();



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
        // console.log("hand", hand)
        var motionX = 0
        var motionY = 0
        // var count = 0
        hand[0]['landmarks'].forEach(element => {
          motionX += parseInt(element[0])
          motionY += parseInt(element[1])
          // count += 1
        });
        // console.log("Num landmarks ", count)
        // console.log("Motion ", motionX)
        updateMotionX(motionX)
        updateMotionY(motionY)
        
        if(hand[0]['handInViewConfidence'] > 0.90){
          updateHandLandmarks(hand)
        }else{
          updateHandLandmarks(null)
        }
      }
      catch{
        updateHandLandmarks(null)
      }
      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      // Set the background color
      ctx.fillStyle = "#D9D9D9";
      ctx.fillRect(0, 0, videoWidth, videoHeight);
      drawHand(hand, ctx, videoWidth, videoHeight);
    }
  };

  const openSettings = () => {
    console.log("Open settings")
    updateFocusAreaPage("trainingPage")
  }


  return (
    <div>

      <button
        onClick={openSettings}
        color="#841584"
        // accessibilityLabel=""
        style={{
          position: "fixed",
          right: 1,
          border: "0px",
          zIndex: 10,
          fontSize: 18
        }}
      >⚙</button>
      

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
            backgroundColor: "#D9D9D9"
            // display: "none"
            // border: "1px solid red"
          }}
        />

        
    </div>
  );
}

export default HandGestureRecognitionMin;
