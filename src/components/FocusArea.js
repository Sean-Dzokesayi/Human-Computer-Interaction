import React, { useState } from "react";
import styles from './FocusArea.module.css'
import ActionMenu from "./ActionMenu";
import GenerateModelDataset from "./GenerateModelDataset";
import ModelTrainer from "./ModelTrainer";



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

          {/* {
              view ? 
              <GenerateModelDataset setIsTraining={setIsTraining} isTraining={isTraining}/>
              : 
              <ModelTrainer />
          } */}

          
    
          {/* <button onClick={() => { setView(!view) }} style={{ marginTop: "2%" }}>Change View</button> */}
        </div>
    </>
    
  );
}
