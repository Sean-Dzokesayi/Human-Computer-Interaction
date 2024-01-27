import React, { useState, useEffect } from "react";
import styles from './ActionMenu.module.css'
import { useAppContext } from './AppProvider'; // Import useModel

export default function ActionMenu() {
  const { handMotionX, triggeredGesture, setTriggeredGesture, focusAreaPage, updateFocusAreaPage, updateIsMenuDisplayed } = useAppContext();
  
  const menuItems = ["home", "trainingPage", "home", "loadDataset", "home"]
  const numMenuItems = menuItems.length;

  const [currentMenuItem, setCurrentMenuItem] = useState(parseInt(numMenuItems / 2));
  const [lastHandPos, setLastHandPos] = useState(null);
  const [isChangingItem, setIsChangingItem] = useState(false);
  const restingThreshold = 150; // Define the resting threshold

  const [clickedItem, setClickedItem] = useState(0)

  const getBgColor = (id) => {
    if (id === currentMenuItem) {
      return "#2C5866";
    } else {
      return "white";
    }
  }

  const moveCursorLeft = () => {
    if (!isChangingItem && currentMenuItem > 0) {
      setIsChangingItem(true);
      setCurrentMenuItem(currentMenuItem - 1);
      setTimeout(() => {
        setIsChangingItem(false);
      }, 1000); // 1-second pause
    }
  }

  const moveCursorRight = () => {
    if (!isChangingItem && currentMenuItem < numMenuItems - 1) {
      setIsChangingItem(true);
      setCurrentMenuItem(currentMenuItem + 1);
      setTimeout(() => {
        setIsChangingItem(false);
      }, 1000); // 1-second pause
    }
  }


  useEffect(() => {
    const moveCursor = async () => {
      if (lastHandPos === null) {
        setLastHandPos(handMotionX);
        return;
      }

      const positionDifference = handMotionX - lastHandPos;
      // Check if the hand motion is within the resting threshold
      if (Math.abs(positionDifference) <= restingThreshold) {
        setIsChangingItem(false); // User is resting, no item change
      } else if (positionDifference > restingThreshold) {
        moveCursorLeft();
      } else if (positionDifference < -restingThreshold) {
        moveCursorRight();
      }
      setLastHandPos(handMotionX); // Update the last hand position
    };

    if(triggeredGesture === "Click"){
      console.log("Clicking")
      setTriggeredGesture("")
      console.log("menu item", currentMenuItem)
      setClickedItem("Option " + (currentMenuItem + 1))

      // perform click navigation

      console.log("clicked on", menuItems[currentMenuItem])
      updateFocusAreaPage(menuItems[currentMenuItem])
      updateIsMenuDisplayed(false)

    }
    moveCursor();
  }, [handMotionX, lastHandPos, restingThreshold, triggeredGesture]);

  return (
    <>
      <div className={styles.actionContainer}>
        <h1 className={styles.heading}>Action Menu</h1>
        <p>{clickedItem}</p>
        <hr className={styles.lineHr} />
        <ul className={styles.actionList} >
        <li
              className={styles.actionListItem}
              style={{ backgroundColor: getBgColor(0) }}>
              <span>A</span>
        </li>
        <li
              className={styles.actionListItem}
              style={{ backgroundColor: getBgColor(1) }}>
              <span>⚙</span>
        </li>
        <li
              className={styles.actionListItem}
              style={{ backgroundColor: getBgColor(2) }}>
              <span>🛖</span>
        </li>
        <li
              className={styles.actionListItem}
              style={{ backgroundColor: getBgColor(3) }}>
              <span>📁</span>
        </li>
        <li
              className={styles.actionListItem}
              style={{ backgroundColor: getBgColor(4) }}>
              <span>E</span>
        </li>

        </ul>
      </div>
    </>
  );
}
