import React from "react";
import styles from './FocusArea.module.css'
import ActionMenu from "./ActionMenu";
import TrainGestureRecogniser from "./TrainGestureRecogniser";



export default function FocusArea({ handLandmarks, setHandLandmarks, isTraining, setIsTraining }) {
  // let actionMenu;
  // if(data?.gesture == "POINTS_EQUAL" && data?.gesture_counter == 3){
  //   actionMenu = <ActionMenu />
  // }
  // else{
  //   actionMenu = null;
  // }

    // console.log("hand landmarks from FocusArea", handLandmarks)
  
  
  return (
    <>
        <div className={styles.container}>
          {/* {actionMenu} */}
          <TrainGestureRecogniser handLandmarks={handLandmarks} setHandLandmarks={setHandLandmarks} setIsTraining={setIsTraining} isTraining={isTraining}/>


        </div>
    </>
    
  );
}
