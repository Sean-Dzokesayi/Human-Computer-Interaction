import React from "react";
import styles from './Sidebar.module.css'
// import { handLandmarksRef } from '../firebase/realtime_db';
// import { onValue } from 'firebase/database';
import { useEffect, useRef, useState } from 'react';
import HandGestureRecognitionMin from "./HandGestureRecognitionMin";
import { useAppContext } from './AppProvider'; // Import useModel
import Predictor from './Predictor'


export default function Sidebar({ isTraining}) {


  const { handLandmarks, updateHandLandmarks, updateFocusAreaPage } = useAppContext();

  const goToHome = () => {
    console.log("Go to home")
    updateFocusAreaPage("home")
  }

  const goToLoadModel = () => {
    updateFocusAreaPage("loadDataset")
  }

  return (
    <>
        <div className={styles.SidebarContainer}>
            <ul className="sideButtonsList">
              <li className={styles.camera}></li>
              <li className={styles.microphone}></li>
              <li className={styles.landmarks}>
              
              <HandGestureRecognitionMin />
              <Predictor />


              <button
                    onClick={goToHome}
                    color="#841584"
                    // accessibilityLabel=""
                    style={{
                      position: "fixed",
                      right: 1,
                      marginTop: "2%",
                      border: "0px",
                      zIndex: 10,
                      fontSize: 18
                    }}
                  >🛖</button>

              <button
                    onClick={goToLoadModel}
                    color="#841584"
                    // accessibilityLabel=""
                    style={{
                      position: "fixed",
                      right: 1,
                      marginTop: "4%",
                      border: "0px",
                      zIndex: 10,
                      fontSize: 18
                    }}
                  >📁</button>
              
              </li>
            </ul>
            
        </div>

    </>
    
  );
}
