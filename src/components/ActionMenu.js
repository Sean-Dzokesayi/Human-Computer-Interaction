import React, { useState, useEffect } from "react";
import styles from './ActionMenu.module.css'
import { useAppContext } from './AppProvider'; // Import useModel

export default function ActionMenu() {
  const { handMotionX } = useAppContext();
  const numMenuItems = 5;
  const [currentMenuItem, setCurrentMenuItem] = useState(parseInt(numMenuItems / 2));
  const [lastHandPos, setLastHandPos] = useState(null);
  const [isChangingItem, setIsChangingItem] = useState(false);
  const restingThreshold = 200; // Define the resting threshold

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

    moveCursor();
  }, [handMotionX, lastHandPos, restingThreshold]);

  return (
    <>
      <div className={styles.actionContainer}>
        <h1 className={styles.heading}>Action Menu</h1>
        <p>{handMotionX !== null && lastHandPos !== null ? handMotionX - lastHandPos : ""}</p>
        <hr className={styles.lineHr} />
        <ul className={styles.actionList} >
          {[0, 1, 2, 3, 4].map((id) => (
            <li
              key={id}
              className={styles.actionListItem}
              style={{ backgroundColor: getBgColor(id) }}
            >
              <span></span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
