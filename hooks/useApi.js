import { useEffect, useState } from 'react';
import axios from 'axios';

const useApi = (url) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  const fetchApi = async () => {
    setLoading(true);
    setError(false);

    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return { loading, data, error };
};

export default useApi;
