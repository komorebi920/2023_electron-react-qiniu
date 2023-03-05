import React, { useState, useEffect } from "react";

const MouseTracker = () => {
  const [positions, setPositions] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMouse = (evt) => {
      console.log(2, "updateMouse");
      setPositions({ x: evt.clientX, y: evt.clientY });
    };

    console.log(1, "addListener");
    document.addEventListener("click", updateMouse);

    return () => {
      console.log(3, "removeListener");
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
