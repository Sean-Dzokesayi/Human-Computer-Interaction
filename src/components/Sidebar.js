import React from "react";
import styles from './Sidebar.module.css'
import { handLandmarksRef } from '../firebase/realtime_db';
import { onValue } from 'firebase/database';
import { useEffect, useRef, useState } from 'react';
import HandGestureRecognition from "../HandGestureRecognition";

export default function Sidebar({ handLandmarks, setHandLandmarks }) {

  return (
    <>
        <div className={styles.SidebarContainer}>
            <ul className="sideButtonsList">
              <li className={styles.camera}></li>
              <li className={styles.microphone}></li>
              <li className={styles.landmarks}>
              <HandGestureRecognition handLandmarks={handLandmarks} setHandLandmarks={setHandLandmarks}/>
              </li>
            </ul>

        </div>

    </>
    
  );
}
