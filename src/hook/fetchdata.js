import { useEffect, useState } from "react";
import Client from "../sanity_client";

const useFetchData = (query) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Client.fetch(query);
        setData(res);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [query]);

  return data;
};

export default useFetchData;
