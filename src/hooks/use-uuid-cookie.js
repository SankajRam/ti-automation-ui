import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

/**
 * Custom hook to handle UUID cookie logic and retrieve the UUID value.
 * If the "uuid" cookie doesn't exist, it generates a new UUID and creates the cookie.
 * @returns {string} - A string which represents the UUID value of current browser session.
 */
const useUUIDCookie = () => {
  const [uuid, setUuid] = useState('');

  useEffect(() => {
    // Check if the "uuid" cookie exists
    const existingUuid = getCookie('uuid');

    if (!existingUuid) {
      // Generate a new UUID
      const newUuid = uuidv4();

      // Calculate the expiration date
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 7); // Set expiration to one week from now

      // Create the cookie with an expiration date
      document.cookie = `uuid=${newUuid}; expires=${expirationDate.toUTCString()}`;

      // Set the UUID value in the state
      setUuid(newUuid);
    } else {
      // Extend the expiration date of the existing cookie
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 7); // Set expiration to one week from now

      // Update the cookie with the extended expiration date
      document.cookie = `uuid=${existingUuid}; expires=${expirationDate.toUTCString()}`;

      // Set the existing UUID value in the state
      setUuid(existingUuid);
    }
  }, []);

  /**
   * Helper function to retrieve a cookie value by its key.
   * @param {string} name - The name of the cookie.
   * @returns {string|null} - The value of the cookie, or null if not found.
   */
  function getCookie(name) {
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();

      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }

    return null;
  }

  return uuid;
};

export default useUUIDCookie;
