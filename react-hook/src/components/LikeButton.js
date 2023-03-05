import React, { useState, useEffect } from "react";
import useMousePosition from "../hooks/useMousePosition";

const LikeButton = () => {
  const position = useMousePosition();
  const [like, setLike] = useState(0);
  const [on, setOn] = useState(true);

  useEffect(() => {
    document.title = `点击了 ${like} 次`;
  });

  return (
    <>
      <p>{position.y}</p>
      <div>
        <button onClick={() => setLike(like + 1)}>{like}</button>
      </div>
      <div>
        <button onClick={() => setOn(!on)}>{on ? "On" : "Off"}</button>
      </div>
    </>
  );
};

export default LikeButton;
