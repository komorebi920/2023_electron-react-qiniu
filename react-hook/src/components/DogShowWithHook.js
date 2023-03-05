import React from "react";
import useUrlLoader from "../hooks/useUrlLoader";

const DogShowWithHook = () => {
  const [data, loading] = useUrlLoader(
    "https://dog.ceo/api/breeds/image/random"
  );
  const style = { width: 200 };

  return (
    <>
      {loading ? (
        <p>读取中......</p>
      ) : (
        <img src={data && data.message} style={style} alt="dog" />
      )}
    </>
  );
};

export default DogShowWithHook;
