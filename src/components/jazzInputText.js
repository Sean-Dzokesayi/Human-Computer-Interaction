import React, { useState } from "react";
import styles from './jazzInputText.module.css'
import * as models from './models/main'
import { useAppContext } from './AppProvider'; // Import useModel

      
export default function JazzInputText() {
  const [userText, setUserText] = useState("");
  const { updateGotoLinkIntent_link,  updateOpenAppName, updateFocusAreaPage, updateCloseAppName, updateJazzOutput, jazzOutput} = useAppContext();
  


  async function sendText() {
    const intent = await models.intent_classification(userText);
    let intent_json = await models.create_intent_json(intent, userText)
    intent_json = JSON.parse(intent_json)
    process_intent_request(intent_json)
  }


  function process_intent_request(intent_json){
    
    switch(intent_json['intent']){
      case "Goto Link":
        let audio = new Audio("./saved_responses/goto_link.mp3")
        audio.play()
        updateGotoLinkIntent_link(intent_json['value'])
        updateFocusAreaPage("GotoLink")
        break
      case "Open App":
        updateOpenAppName(intent_json['value'])
        updateFocusAreaPage("openApp")
        break
      case "Close App":
        updateCloseAppName(intent_json['value'])
        updateFocusAreaPage("closeApp")
        break
      case "Increase Volume":
        vol_up();
        break
      case "Decrease Volume":
          vol_down();
          break
      case "Question":
        updateJazzOutput(intent_json['jazz_output'])
        updateFocusAreaPage("jazzOutput")
        break
      case "Other":
        updateJazzOutput(intent_json['jazz_output'])
        updateFocusAreaPage("jazzOutput")
        break          
      default:
        console.log("default case")
        break
    }
  }

  function vol_up(){
    const url = `http://127.0.0.1:5001/vol_up`;
  
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Assuming the response is in JSON format
      })
      .then(data => {
        console.log('Response data:', data);
        // Handle the response data here
      })
      .catch(error => {
        // console.error('Error:', error);
        // Handle any errors here
      });
  }

  function vol_down(){
    const url = `http://127.0.0.1:5001/vol_down`;
  
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Assuming the response is in JSON format
      })
      .then(data => {
        console.log('Response data:', data);
        // Handle the response data here
      })
      .catch(error => {
        // console.error('Error:', error);
        // Handle any errors here
      });
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      sendText();
    }
  }

  return (
    <div className="input-group mb-3">
      <input
        type="text"
        id="user_input"
        className={styles.textbox}
        placeholder="Enter your input"
        value={userText}
        onChange={(e) => setUserText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

/*
    "Create New File",
    "Move File",
    "Update File",
    "Append To File",
    "Type Text"
*/