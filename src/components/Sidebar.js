import React from "react";
import styles from './Sidebar.module.css'
import { handLandmarksRef } from '../firebase/realtime_db';
import { onValue } from 'firebase/database';
import { useEffect, useRef, useState } from 'react';

import LandmarkPlotter from "./LandmarkPlotter";





export default function Sidebar() {


  const [previousLandmarks, setPreviousLandmarks] = useState([]);
  const [handLandmarks, setHandLandmarks] = useState([]);


  return (
    <>
        <div className={styles.SidebarContainer}>
            <ul className="sideButtonsList">
              <li className={styles.camera}></li>
              <li className={styles.microphone}></li>
              <li className={styles.landmarks}>
                <LandmarkPlotter 
                    landmarks={handLandmarks || previousLandmarks} 
                    height="120" 
                    width="120" 
                  />
              </li>
            </ul>

        </div>

    </>
    
  );
}
