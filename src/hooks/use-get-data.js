import { useState, useEffect } from 'react';
import { fetchWithTimeout } from '../util/fetchWithTimeout';
import networkMessages from '../data/network-messages.json';
import networkConfig from '../data/network-config.json';

/**
 * Custom hook for fetching data from a specified URL.
 * @param {string} url - The URL to fetch data from.
 * @returns {object} - An object containing data retrieval functions.
 */
const useGetData = (url, uuid) => {
  const { HTTP_STATUS_MSG } = networkMessages;
  const { TIMEOUT_MS } = networkConfig;

  const [data, setData] = useState({});

  useEffect(() => {
    /**
     * Fetches data from the specified URL and updates the state.
     */
    const fetchData = async () => {
      try {
        const response = await fetchWithTimeout(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({uuid: uuid}),
        }, TIMEOUT_MS);

        if (!response.ok) {
          throw new Error(HTTP_STATUS_MSG + response.status + " " + response.statusText);
        }

        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [url, uuid, HTTP_STATUS_MSG, TIMEOUT_MS]);

  /**
   * Getter function that retrieves the fetched data.
   * @returns {object} - The fetched data.
   */
  const getData = () => {
    return data;
  };

  /**
   * Getter function that retrieves a specific value from the fetched data using the provided key.
   * @param {string} key - The key to access the desired value in the data object.
   * @returns {string} - The value associated with the provided key.
   */
  const getDataWithKey = (key) => {
    return data[key];
  };

  return { getData, getDataWithKey };
};

export default useGetData;