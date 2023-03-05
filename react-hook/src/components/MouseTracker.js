import React, { useState, useEffect } from "react";

const MouseTracker = () => {
  const [positions, setPositions] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMouse = (evt) => {
      setPositions({ x: evt.clientX, y: evt.clientY });
    };

    document.addEventListener("click", updateMouse);

    return () => {
      document.removeEventListener("click", updateMouse);
    };
  });

  return (
    <p>
      X: {positions.x}, Y: {positions.y}
    </p>
  );
};

export default MouseTracker;
