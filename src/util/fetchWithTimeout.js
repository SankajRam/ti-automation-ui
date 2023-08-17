import networkMessages from '../data/network-messages.json';
import networkConfig from '../data/network-config.json';

/**
 * Performs a fetch request with a timeout.
 * @function
 * @param {string} url - The URL to fetch.
 * @param {object} [opts={}] - Optional additional fetch options.
 * @param {number} [timeout=networkConfig.DEFAULT_TIMEOUT_MS] - The timeout duration in milliseconds.
 * @returns {Promise<Response>} - A promise that resolves to the response from the fetch request.
 * @throws {Error} - Throws an error if the fetch request is aborted or encounters an error.
 */
export const fetchWithTimeout = async (url, opts = {}, timeout = networkConfig.DEFAULT_TIMEOUT_MS) => {
  // Create the AbortController instance, get AbortSignal
  const abortController = new AbortController();
  const { signal } = abortController;
  const { TIMEOUT_MSG } = networkMessages;

  // Make the fetch request
  const _fetchPromise = fetch(url, {
    ...opts,
    signal,
  });

  // Start the timer
  const timer = setTimeout(() => abortController.abort(), timeout);

  // Await the fetch with a catch in case it's aborted which signals an error
  try {
    const response = await _fetchPromise;
    clearTimeout(timer);
    return response;
  } catch (error) {
    clearTimeout(timer);
    if (error.name === 'AbortError') {
      throw new Error(TIMEOUT_MSG);
    }
    throw error;
  }
};