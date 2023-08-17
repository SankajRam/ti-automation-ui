import { useEffect } from 'react';

/**
 * Custom hook to clear data on page leave.
 * @param {string} url - The URL to send the DELETE request for clearing the cache.
 * @param {string} uuid - The UUID of current browser session.
 */
const useClearDataOnPageLeave = (url, uuid) => {
  useEffect(() => {
    /**
     * Event listener function to handle the 'beforeunload' event.
     * @param {Event} event - The 'beforeunload' event object.
     */
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = false; // required for chrome browsers

      // Send a DELETE request to the specified URL to clear the cache
      fetch(url, {
        method: 'POST',
        keepalive: true,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({uuid: uuid}),
      })
        .then((response) => {
          // Handle the response
          console.log('Cache cleared successfully');
        })
        .catch((error) => {
          // Handle the error
          console.error('Failed to clear cache:', error);
        });
    };

    // Add the 'beforeunload' event listener when the component mounts
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Remove the 'beforeunload' event listener when the component unmounts
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [url, uuid]);
};

export default useClearDataOnPageLeave;