import React, { useEffect, useState } from "react";
import styles from './TrainGestureRecogniser.module.css';
import HandGestureRecognitionMax from "./HandGestureRecognitionMax";
import trainClassificationModel from '../trainingUtil';

export default function TrainGestureRecogniser({ handLandmarks, setHandLandmarks,isTraining, setIsTraining  }) {

  const [counter, setCounter] = useState(0);
  const [labelTracker, setTracker] = useState(0);

  const [completedCounter, setCompletedCounter] = useState([0 , 0, 0, 0, 0, 0, 0, 0 ,0 ,0])
  const [completedCounterIndex, setCompletedCounterIndex] = useState(0)

  const [trainingData, setTrainingData] = useState([])

  const downloadCSV = () => {
    const csvContent = trainingData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'example.csv'; // Specify the file name
    a.click();
    URL.revokeObjectURL(url);
    trainClassificationModel(trainingData)
  };
  
  const labels = [
    "PALM",
    "FIST",
    "THUMBS_UP",
    "THUMBS_DOWN",
    "POINTS_EQUAL"
] 



  useEffect(() => {
    // console.log("origional landmarks: ", handLandmarks)
    setIsTraining(true)

    const intervalId = setInterval(() => {
      // Count 3 seconds on each run
      if (counter < 3) {
        setCounter((prevCounter) => prevCounter + 1);
      } else {

        var record = []
        try{
          handLandmarks[0]['landmarks'].forEach(landmark => {
            // console.log(landmark) 
            record.push(landmark[0])
            record.push(landmark[1])
            record.push(landmark[2])
          });
          record.push(labels[labelTracker])
          // console.log("Record:", record)

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
        if(completedCounter[9] === 1){

          if(labelTracker < labels.length - 1){
            setTracker(labelTracker + 1)
          }else{
            setTracker(0)
          }

          setCompletedCounter([0 , 0, 0, 0, 0, 0, 0, 0 ,0 ,0])
          setCompletedCounterIndex(0)
          
          
          return
        }

        // update progress bars
        let completedArr = completedCounter
        completedArr[completedCounterIndex] = 1
        setCompletedCounterIndex(completedCounterIndex + 1)

        
      }

      
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [counter]);

  return (
    <>
      <div className={styles.container}>
        

        
        <p className={styles.label}>{labels[labelTracker]}</p> 
        <p className={styles.counter}>{counter}</p>

        <div className={styles.actionViewContainer}>
          <div className={styles.actionViewLeft}>

            { labelTracker == 0 ?  <span className={styles.displayedIcon}>✋</span> : null}
            {labelTracker == 1 ?  <span className={styles.displayedIcon}>✊</span> : null}
            {labelTracker == 2 ?  <span className={styles.displayedIcon}>👍</span> : null}
            {labelTracker == 3 ?  <span className={styles.displayedIcon}>👎</span> : null}
            {labelTracker == 4 ?  <span className={styles.displayedIcon}>⭕️</span> : null}
            
          </div>
          <div className={styles.actionViewRight}>
            <HandGestureRecognitionMax handLandmarks={handLandmarks} setHandLandmarks={setHandLandmarks} width={460} height={400}/>
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
          <span className={styles.progressPercentage}>{(completedCounterIndex / 10) * 100}%</span>
          
          
        </ul>
        <div>
      <button onClick={downloadCSV}>Download CSV</button>
    </div>
      </div>


    </>
  );
}
