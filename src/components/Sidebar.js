import React from "react";
import styles from './Sidebar.module.css'
// import { handLandmarksRef } from '../firebase/realtime_db';
// import { onValue } from 'firebase/database';
import { useEffect, useRef, useState } from 'react';
import HandGestureRecognitionMin from "./HandGestureRecognitionMin";

export default function Sidebar({ handLandmarks, setHandLandmarks, isTraining}) {


  // console.log("hand landmarks from sidebar", handLandmarks)

  return (
    <>
        <div className={styles.SidebarContainer}>
            <ul className="sideButtonsList">
              <li className={styles.camera}></li>
              <li className={styles.microphone}></li>
              <li className={styles.landmarks}>
              
              { isTraining == false ? 
               <HandGestureRecognitionMin handLandmarks={handLandmarks} setHandLandmarks={setHandLandmarks}/>
               : null
            }
             
              
              </li>
            </ul>

        </div>

    </>
    
  );
}
