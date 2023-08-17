import { useState, useEffect, useCallback } from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { fetchWithTimeout } from '../util/fetchWithTimeout';
import networkMessages from '../data/network-messages.json';
import networkConfig from '../data/network-config.json';

/**
 * Custom hook for posting data to a specified URL.
 * @returns {object} - An object containing response and error states, as well as data posting functions.
 */
const usePostData = () => {
  const { HTTP_STATUS_MSG, UNEXPECTED_ERROR_MSG, NO_CONN_MSG } = networkMessages;
  const { TIMEOUT_MS } = networkConfig;

  const [responseData, setResponseData] = useState('');
  const [error, setError] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  // Effect to disable webpage scrolling when data is being fetched
  useEffect(() => {
    if (isFetching) {
      disableBodyScroll(document.querySelector('body'));
    } else {
      enableBodyScroll(document.querySelector('body'));
    }
  }, [isFetching]);

  /**
   * Posts data to the specified URL.
   * @param {string} url - The URL to post the data to.
   * @param {object} data - The data to be posted.
   */
  const postData = useCallback(async (url, data, addHeaders) => {
    try {
      const response = await fetchWithTimeout(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...addHeaders
        },
        body: data ? JSON.stringify(data) : "",
      }, TIMEOUT_MS);

      if (!response.ok) {
        throw new Error(HTTP_STATUS_MSG + response.status + " " + response.statusText);
      }

      const responseData = await response.text();
      setResponseData(responseData);
      setError('');
    } catch (error) {
      setResponseData('');
      setError((error.message === "Failed to fetch" ?  NO_CONN_MSG : error.message) || UNEXPECTED_ERROR_MSG);
    } finally {
      setIsFetching(false);
    }
  }, [HTTP_STATUS_MSG, UNEXPECTED_ERROR_MSG, TIMEOUT_MS, NO_CONN_MSG]);

  return { responseData, error, isFetching, postData, setIsFetching };
};

export default usePostData;