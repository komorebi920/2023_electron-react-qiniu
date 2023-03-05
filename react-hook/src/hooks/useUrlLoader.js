import { useState, useEffect } from "react";
import axios from "axios";

const useUrlLoader = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        setData(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  return [data, loading];
};

export default useUrlLoader;
