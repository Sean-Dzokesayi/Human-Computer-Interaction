import React from "react";
import styles from './FocusArea.module.css'
import ActionMenu from "./ActionMenu";



export default function FocusArea({data}) {
  let actionMenu;
  if(data?.gesture == "POINTS_EQUAL" && data?.gesture_counter == 3){
    actionMenu = <ActionMenu />
  }
  else{
    actionMenu = null;
  }

  return (
    <>
        <div className={styles.container}>
          {actionMenu}


        </div>
    </>
    
  );
}
