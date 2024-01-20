import React, { useRef, useEffect } from 'react';
import styles from './LandmarkPlotter.module.css'

const LandmarkPlotter = React.memo(({ landmarks, width, height }) => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  // Initialize canvas and context once
  useEffect(() => {
    const canvas = canvasRef.current;
    ctxRef.current = canvas.getContext('2d');
  }, []);

  // Draw landmarks
  useEffect(() => {
    const ctx = ctxRef.current;
    if (ctx) {
      ctx.clearRect(0, 0, width, height); // Clear previous drawings
      landmarks.forEach(landmark => {
        const screenX = landmark.x * width;
        const screenY = landmark.y * height;

        ctx.beginPath();
        ctx.arc(screenX, screenY, 2, 0, 2 * Math.PI);
        ctx.fillStyle = 'blue';
        ctx.fill();
      });
    }
  }, [landmarks, width, height]);

  return <canvas className={styles.canvas} ref={canvasRef} width={width} height={height}/>; /*   */
});

export default LandmarkPlotter;
