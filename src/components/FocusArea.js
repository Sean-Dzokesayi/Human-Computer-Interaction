import React, { useEffect, useState, useRef } from "react";
import styles from './FocusArea.module.css'
import ActionMenu from "./ActionMenu";
import GenerateModelDataset from "./GenerateModelDataset";
import ModelTrainer from "./ModelTrainer";
import { useAppContext } from './AppProvider'; // Import useModel
import GotoLink from "./intentViews/GotoLink";
import OpenApp from "./intentViews/OpenApp";
import CloseApp from "./intentViews/CloseApp";
import JazzOut from "./intentViews/JazzOutput";
import DocumentViewerPdf from "./DocumentViewerPdf";


export default function FocusArea({  }) {
    const { triggeredGesture, isMenuDisplayed, focusAreaPage, updateIsTraining, isTraining, updateTranscript,
      transcript  } = useAppContext();
    const [view, setView] = useState(false)
    const [nowDisplaying, setNowDisplaying] = useState(null)

    //rec
    const [recording, setRecording] = useState(false);
    const mediaRecorderRef = useRef(null);
    const chunksRef = useRef([]);
    const [audioUrl, setAudioUrl] = useState(null);

const handleStartRecording = async () => {
  console.log("Starting recording");
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const mediaRecorder = new MediaRecorder(stream);
  mediaRecorderRef.current = mediaRecorder;

  mediaRecorder.addEventListener('dataavailable', (event) => {
    if (event.data.size > 0) {
      chunksRef.current.push(event.data);
    }
  });

  mediaRecorder.addEventListener('stop', () => {
    const audioBlob = new Blob(chunksRef.current, { type: 'audio/wav' });
    const url = URL.createObjectURL(audioBlob);
    setAudioUrl(url); 
    // Create a hidden download link
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    console.log(url)
    downloadLink.download = "audio.webm"; // Set the desired filename for the downloaded audio file
    downloadLink.style.display = "none"; // Hide the download link
  
    // Append the audio element and download link to the DOM
    document.body.appendChild(downloadLink);
    // Trigger the click event on the anchor to initiate the download
    downloadLink.click();

    // Remove the anchor from the document body
    document.body.removeChild(downloadLink);

    // Revoke the URL to release resources
    URL.revokeObjectURL(audioUrl);


  });

  mediaRecorder.start();
  setRecording(true);
};

const handleStopRecording = async (mediaRecorder) => {
  console.log("Stopping recording...")
  if (mediaRecorder && mediaRecorder.state === 'recording') {
    mediaRecorder.stop();
    setRecording(false);
    chunksRef.current = []
    mediaRecorderRef.current = null
    await getTranscript(); // await the completion of getTranscript function
  }
};


async function getTranscript() {
  console.log("Getting transcript...")
  const url = 'http://127.0.0.1:5001/transcribe_audio';

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    // console.log(data)
    console.log('Response data:', data['transcript']);
    updateTranscript(data['transcript'])
    // Handle the response data here
  } catch (error) {
    console.error('Error:', error);
    // Handle any errors here
  }
}




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
      setNowDisplaying(null)
      setNowDisplaying(<JazzOut />)
    }
    else if (focusAreaPage === "mic") {
      handleStartRecording();
    }
    else if(focusAreaPage === "micStop"){
      handleStopRecording(mediaRecorderRef.current);
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


                      {/* {audioUrl && (
              <audio controls src={audioUrl}></audio>
            )} */}



          {nowDisplaying == null ? 
          
          //  <DocumentViewerPdf />
         null
          : nowDisplaying}
        </div>
    </>
    
  );
}
