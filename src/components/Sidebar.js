import React from "react";
import styles from './Sidebar.module.css'
// import { handLandmarksRef } from '../firebase/realtime_db';
// import { onValue } from 'firebase/database';
import { useEffect, useRef, useState } from 'react';
import HandGestureRecognitionMin from "./HandGestureRecognitionMin";
import { useAppContext } from './AppProvider'; // Import useModel
import Predictor from './Predictor'


export default function Sidebar({ isTraining}) {


  const { handLandmarks, updateHandLandmarks } = useAppContext();

  return (
    <>
        <div className={styles.SidebarContainer}>
            <ul className="sideButtonsList">
              <li className={styles.camera}></li>
              <li className={styles.microphone}></li>
              <li className={styles.landmarks}>
              
              <HandGestureRecognitionMin />
              <Predictor />
              
              </li>
            </ul>
            
            <p>gere</p>

        </div>

    </>
    
  );
}
