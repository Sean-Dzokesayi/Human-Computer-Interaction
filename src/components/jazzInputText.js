import React, { useState } from "react";
import styles from './jazzInputText.module.css'

export default function JazzInputText() {
  const [userText, setUserText] = useState("");

  function sendText() {
    console.log(userText);
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
