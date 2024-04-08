import React, { useEffect } from "react";
import styles from './GotoLink.module.css'
import { useAppContext } from '../AppProvider'; // Import useModel


export default function OpenApp() {
  const { openAppName, updateOpenAppName} = useAppContext();
  console.log(openAppName)
  
  useEffect(() => {
    if (!openAppName) return; // Only proceed if openAppName is set
  
    const url = `http://127.0.0.1:5001/open_app?text=${encodeURIComponent(openAppName)}`;
  
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
  }, [openAppName]); // Add openAppName to the dependency array
  
  

  return (
    <>
        <p className={styles.text}>Opening {openAppName} ...</p>
    </>
    
  );
}

