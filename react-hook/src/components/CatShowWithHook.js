import React, { useState } from "react";
import useUrlLoader from "../hooks/useUrlLoader";

const CatShowWithHook = () => {
  const [category, setCategory] = useState("1");
  const [data, loading] = useUrlLoader(
    `https://api.thecatapi.com/v1/images/search?category_ids=${category}`
  );
  const style = { width: 200 };

  return (
    <>
      {loading ? (
        <p>读取中......</p>
      ) : (
        <img src={data && data[0].url} style={style} alt="cat" />
      )}
      <button onClick={() => setCategory("1")}>帽子</button>
      <button onClick={() => setCategory("5")}>盒子</button>
    </>
  );
};

export default CatShowWithHook;
