import React, { useState, useEffect } from "react";
import axios from "axios";

const DogShow = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetch, setFetch] = useState(false);

  const style = { width: 200 };

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://dog.ceo/api/breeds/image/random")
      .then((res) => {
        const { message, status } = res.data;
        if (status === "success") {
          setUrl(message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [fetch]);

  return (
    <>
      {loading ? (
        <p>读取中......</p>
      ) : (
        <img src={url} style={style} alt="dog" />
      )}
      <button onClick={() => setFetch(!fetch)}>重新获取图片</button>
    </>
  );
};

export default DogShow;
