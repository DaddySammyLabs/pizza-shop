import { useState, useEffect } from "react";
// import { API, ENDPOINTS } from "@/api/api";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchItems = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(url, {
          signal: controller.signal,
        });

        setData(response.data);
      } catch (err) {
        if (err.name !== "CanceledError" && err.code !== "ERR_CANCELED") {
          setError(err.message || "Something went wrong");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchItems();

    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
