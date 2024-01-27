import React, { useEffect, useState } from "react";
import styles from './FocusArea.module.css'
import ActionMenu from "./ActionMenu";
import GenerateModelDataset from "./GenerateModelDataset";
import ModelTrainer from "./ModelTrainer";
import { useAppContext } from './AppProvider'; // Import useModel
import GotoLink from "./intentViews/GotoLink";
import OpenApp from "./intentViews/OpenApp";
import CloseApp from "./intentViews/CloseApp";
import JazzOut from "./intentViews/JazzOutput";


export default function FocusArea({  }) {
    const { triggeredGesture, isMenuDisplayed, focusAreaPage, updateIsTraining, isTraining  } = useAppContext();
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
    else if(focusAreaPage === "GotoLink"){
      setNowDisplaying(<GotoLink />)
    }
    else if(focusAreaPage === "openApp"){
      setNowDisplaying(<OpenApp />)
    }
    else if(focusAreaPage === "closeApp"){
      setNowDisplaying(<CloseApp />)
    }
    else if(focusAreaPage === "jazzOutput"){
      setNowDisplaying(<JazzOut />)
    }

    // Check if we are on the training page
    if(focusAreaPage === "trainingPage"){
      updateIsTraining(true)
    }
    else{
      updateIsTraining(false)
    }


    
  }, [focusAreaPage]); 
  
  return (
    <>
        <div className={styles.container}>
          { (isMenuDisplayed && !isTraining) ? <ActionMenu /> : null }


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
