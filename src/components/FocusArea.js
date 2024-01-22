import React, { useState } from "react";
import styles from './FocusArea.module.css'
import ActionMenu from "./ActionMenu";
import TrainGestureRecogniser from "./TrainGestureRecogniser";
import GestureRecognizer from "./GestureRecognizer";



export default function FocusArea({ handLandmarks, setHandLandmarks, isTraining, setIsTraining }) {
  // let actionMenu;
  // if(data?.gesture == "POINTS_EQUAL" && data?.gesture_counter == 3){
  //   actionMenu = <ActionMenu />
  // }
  // else{
  //   actionMenu = null;
  // }

    // console.log("hand landmarks from FocusArea", handLandmarks)
    const [view, setView] = useState(false);


  
  
  return (
    <>
        <div className={styles.container}>
          {/* {actionMenu} */}

          {
              view ? 
              <TrainGestureRecogniser handLandmarks={handLandmarks} setHandLandmarks={setHandLandmarks} setIsTraining={setIsTraining} isTraining={isTraining}/>
              : 
              <GestureRecognizer handLandmarks={handLandmarks}/>
          }
    
          <button onClick={() => { setView(!view) }} style={{ marginTop: "2%" }}>Change View</button>
        </div>
    </>
    
  );
}
