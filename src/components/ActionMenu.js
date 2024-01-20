import React from "react";
import styles from './ActionMenu.module.css'


export default function ActionMenu() {

  return (
    <>
        <div className={styles.actionContainer}>
            <h1 className={styles.heading}>Action Menu</h1>

            <hr className={styles.lineHr}/>
          
            <ul className={styles.actionList}>
              <li className={styles.actionListItem}>
                <span></span>
              </li>
              <li className={styles.actionListItem}>
                <span></span>
              </li>
              <li className={styles.actionListItem}>
                <span></span>
              </li>
              <li className={styles.actionListItem}>
                <span></span>
              </li>
              <li className={styles.actionListItem}>
                <span></span>
              </li>
            </ul>

        </div>
    </>
    
  );
}
