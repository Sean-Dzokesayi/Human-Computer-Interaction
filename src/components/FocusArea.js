import React, { useEffect, useState } from "react";
import styles from './FocusArea.module.css'
import ActionMenu from "./ActionMenu";
import GenerateModelDataset from "./GenerateModelDataset";
import ModelTrainer from "./ModelTrainer";
import { useAppContext } from './AppProvider'; // Import useModel


export default function FocusArea({  }) {
    const { triggeredGesture, isMenuDisplayed, focusAreaPage  } = useAppContext();
    const [view, setView] = useState(false)
    const [nowDisplaying, setNowDisplaying] = useState(null)

  useEffect(() => {
    if(focusAreaPage === "trainingPage"){
      setNowDisplaying(<GenerateModelDataset />);
    }
    else if(focusAreaPage === "home"){
      setNowDisplaying(null);
    }
    else if(focusAreaPage === "loadDataset"){
      setNowDisplaying(<ModelTrainer />);
    }
    
  }, [focusAreaPage]); 
  
  return (
    <>
        <div className={styles.container}>
          { (isMenuDisplayed) ? <ActionMenu /> : null }


          {nowDisplaying}
          {/* {
              view ? 
              <GenerateModelDataset />
              : 
              <ModelTrainer /> 
          } */}

          
    
          {/* <button onClick={() => { setView(!view) }} style={{ marginTop: "2%" }}>Change View</button> */}
        </div>
    </>
    
  );
}
