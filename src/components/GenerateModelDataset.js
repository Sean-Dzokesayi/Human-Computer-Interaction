import React, { useEffect, useState } from "react";
import styles from './TrainGestureRecogniser.module.css';
import HandGestureRecognitionMax from "./HandGestureRecognitionMax";
import { useAppContext } from './AppProvider'; // Import useModel


export default function GenerateModelDataset({  }) {

  const { handLandmarks, updateHandLandmarks, updateIsTraining,isTraining } = useAppContext();
  const [counter, setCounter] = useState(0);
  const [labelTracker, setTracker] = useState(0);
  const [completedCounter, setCompletedCounter] = useState(
    [
      0 , 0, 0, 0, 0, 0, 0, 0 ,0 ,0,
      0 , 0, 0, 0, 0, 0, 0, 0 ,0 ,0,
      0 , 0, 0, 0, 0, 0, 0, 0 ,0 ,0,
      0 , 0, 0, 0, 0, 0, 0, 0 ,0 ,0,
  ])
  const [completedCounterIndex, setCompletedCounterIndex] = useState(0)
  const [trainingData, setTrainingData] = useState([])

  const downloadData = () => {
    const csvContent = trainingData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'gestureDataset.csv'; // Specify the file name
    a.click();
    URL.revokeObjectURL(url);
  };
  
  const labels = [
    "PALM",
    "FIST",
    "THUMBS_UP",
    "THUMBS_DOWN",
    "POINTS_EQUAL",
    "Click"
] 

  // useEffect(() => {
  //   updateIsTraining(true)
  // }, [])

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Count 3 seconds on each run
      if (counter < 3) {
        setCounter((prevCounter) => prevCounter + 1);
      } else {

        var record = []
        try{
          handLandmarks[0]['landmarks'].forEach(landmark => {
            // console.log(landmark) 
            record.push(parseInt(landmark[0]))
            record.push(parseInt(landmark[1]))
            record.push(parseInt(landmark[2]))
          });
          record.push(labels[labelTracker])
          console.log("Record:", record)

          // add new record to our trainingData
          var temp = trainingData
          temp.push(record)
          setTrainingData(temp)
          // console.log("Length of data: ", trainingData.length)
          console.log("trainingData: ", trainingData)
        }
        catch{

        }

        setCounter(0);
        if(completedCounter[39] === 1){

          if(labelTracker < labels.length - 1){
            setTracker(labelTracker + 1)
          }else{
            setTracker(0)
          }

          setCompletedCounter(
            [
              0 , 0, 0, 0, 0, 0, 0, 0 ,0 ,0,
              0 , 0, 0, 0, 0, 0, 0, 0 ,0 ,0,
              0 , 0, 0, 0, 0, 0, 0, 0 ,0 ,0,
              0 , 0, 0, 0, 0, 0, 0, 0 ,0 ,0,
            ]
            )
          setCompletedCounterIndex(0)
          return
        }

        // update progress bars
        let completedArr = completedCounter
        completedArr[completedCounterIndex] = 1
        setCompletedCounterIndex(completedCounterIndex + 1) 
      }
    }, 50);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [counter]);

  return (
    <>
      <div className={styles.container}>
        
        <p className={styles.label}>{labels[labelTracker]} ({trainingData.length})</p> 
        <p className={styles.counter}>{counter}</p>

        <div className={styles.actionViewContainer}>
          <div className={styles.actionViewLeft}>

            { labelTracker === 0 ?  <span className={styles.displayedIcon}>✋</span> : null}
            {labelTracker === 1 ?  <span className={styles.displayedIcon}>✊</span> : null}
            {labelTracker === 2 ?  <span className={styles.displayedIcon}>👍</span> : null}
            {labelTracker === 3 ?  <span className={styles.displayedIcon}>👎</span> : null}
            {labelTracker === 4 ?  <span className={styles.displayedIcon}>⭕️</span> : null} 
            {labelTracker === 5 ?  <span className={styles.displayedIcon}>👌</span> : null}

          </div>
          <div className={styles.actionViewRight}>
            <HandGestureRecognitionMax width={460} height={400}/>
          </div>
        </div>
        

        <ul className={styles.progressPoints}>
          <li className={styles.point} style={{backgroundColor : (completedCounter[0]) ? "green" : "white"}}></li>
          <li className={styles.point} style={{backgroundColor : (completedCounter[1]) ? "green" : "white"}}></li>
          <li className={styles.point} style={{backgroundColor : (completedCounter[2]) ? "green" : "white"}}></li>
          <li className={styles.point} style={{backgroundColor : (completedCounter[3]) ? "green" : "white"}}></li>
          <li className={styles.point} style={{backgroundColor : (completedCounter[4]) ? "green" : "white"}}></li>
          <li className={styles.point} style={{backgroundColor : (completedCounter[5]) ? "green" : "white"}}></li>
          <li className={styles.point} style={{backgroundColor : (completedCounter[6]) ? "green" : "white"}}></li>
          <li className={styles.point} style={{backgroundColor : (completedCounter[7]) ? "green" : "white"}}></li>
          <li className={styles.point} style={{backgroundColor : (completedCounter[8]) ? "green" : "white"}}></li>
          <li className={styles.point} style={{backgroundColor : (completedCounter[9]) ? "green" : "white"}}></li>
          <li className={styles.point} style={{backgroundColor : (completedCounter[10]) ? "green" : "white"}}></li>
          <li className={styles.point} style={{backgroundColor : (completedCounter[11]) ? "green" : "white"}}></li>
          <li className={styles.point} style={{backgroundColor : (completedCounter[12]) ? "green" : "white"}}></li>
          <li className={styles.point} style={{backgroundColor : (completedCounter[13]) ? "green" : "white"}}></li>
          <li className={styles.point} style={{backgroundColor : (completedCounter[14]) ? "green" : "white"}}></li>
          <li className={styles.point} style={{backgroundColor : (completedCounter[15]) ? "green" : "white"}}></li>
          <li className={styles.point} style={{backgroundColor : (completedCounter[16]) ? "green" : "white"}}></li>
          <li className={styles.point} style={{backgroundColor : (completedCounter[17]) ? "green" : "white"}}></li>
          <li className={styles.point} style={{backgroundColor : (completedCounter[18]) ? "green" : "white"}}></li>
          <li className={styles.point} style={{backgroundColor : (completedCounter[19]) ? "green" : "white"}}></li>
          <li className={styles.point} style={{backgroundColor : (completedCounter[20]) ? "green" : "white"}}></li>
          <li className={styles.point} style={{backgroundColor : (completedCounter[21]) ? "green" : "white"}}></li>
          <li className={styles.point} style={{backgroundColor : (completedCounter[22]) ? "green" : "white"}}></li>
          <li className={styles.point} style={{backgroundColor : (completedCounter[23]) ? "green" : "white"}}></li>
          <li className={styles.point} style={{backgroundColor : (completedCounter[24]) ? "green" : "white"}}></li>
          <li className={styles.point} style={{backgroundColor : (completedCounter[25]) ? "green" : "white"}}></li>
          <li className={styles.point} style={{backgroundColor : (completedCounter[26]) ? "green" : "white"}}></li>
          <li className={styles.point} style={{backgroundColor : (completedCounter[27]) ? "green" : "white"}}></li>
          <li className={styles.point} style={{backgroundColor : (completedCounter[28]) ? "green" : "white"}}></li>
          <li className={styles.point} style={{backgroundColor : (completedCounter[29]) ? "green" : "white"}}></li>
          <li className={styles.point} style={{backgroundColor : (completedCounter[30]) ? "green" : "white"}}></li>
          <li className={styles.point} style={{backgroundColor : (completedCounter[31]) ? "green" : "white"}}></li>
          <li className={styles.point} style={{backgroundColor : (completedCounter[32]) ? "green" : "white"}}></li>
          <li className={styles.point} style={{backgroundColor : (completedCounter[33]) ? "green" : "white"}}></li>
          <li className={styles.point} style={{backgroundColor : (completedCounter[34]) ? "green" : "white"}}></li>
          <li className={styles.point} style={{backgroundColor : (completedCounter[35]) ? "green" : "white"}}></li>
          <li className={styles.point} style={{backgroundColor : (completedCounter[36]) ? "green" : "white"}}></li>
          <li className={styles.point} style={{backgroundColor : (completedCounter[37]) ? "green" : "white"}}></li>
          <li className={styles.point} style={{backgroundColor : (completedCounter[38]) ? "green" : "white"}}></li>
          <li className={styles.point} style={{backgroundColor : (completedCounter[39]) ? "green" : "white"}}></li>
          <span className={styles.progressPercentage}>{parseInt((completedCounterIndex / completedCounter.length) * 100)}%</span>
          
          
        </ul>
        <div>
      <button onClick={downloadData} >Download CSV</button>
    </div>
      </div>


    </>
  );
}
