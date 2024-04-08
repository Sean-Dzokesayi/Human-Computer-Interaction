import React, { useEffect, useRef } from "react";
import styles from './GotoLink.module.css';
import { useAppContext } from '../AppProvider';

export default function GotoLink() {
  const { gotoLinkIntent_link } = useAppContext();
  const linkOpenedRef = useRef(false); // Ref to track if the link has been opened

  useEffect(() => {
    if (gotoLinkIntent_link && !linkOpenedRef.current) {
      window.open(gotoLinkIntent_link, '_blank');
      linkOpenedRef.current = true; // Set flag to true after opening the link
    }
  }, [gotoLinkIntent_link]); // Depend on gotoLinkIntent_link
  
  return (
    <>
      <p className={styles.text}>Opening {gotoLinkIntent_link} ...</p>
    </>
  );
}
