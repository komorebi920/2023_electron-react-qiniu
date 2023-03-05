import { useState, useEffect } from "react";

const useMousePosition = () => {
  const [positions, setPositions] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMouse = (evt) => {
      setPositions({ x: evt.clientX, y: evt.clientY });
    };

    document.addEventListener("mousemove", updateMouse);

    return () => {
      document.removeEventListener("mousemove", updateMouse);
    };
  });

  return positions;
};

export default useMousePosition;
