import React, { useEffect } from "react";
import styles from './GotoLink.module.css'
import { useAppContext } from '../AppProvider'; // Import useModel


export default function JazzOut() {
  const { jazzOutput } = useAppContext();
  
  useEffect(() => {
    
  }, []); 
  

  return (
    <>
        <p>{jazzOutput} </p>
    </>
    
  );
}

