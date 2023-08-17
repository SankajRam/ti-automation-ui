import { useState, useEffect } from 'react';
import { FaClipboard, FaCheck } from 'react-icons/fa';
import '../styles/CopyButton.css';

/**
 * CopyButton component for copying data to the clipboard.
 *
 * @component
 * @param {object} props - Component props
 * @param {string} props.data - The data to be copied.
 * @param {boolean} props.isErrorMessage - Button will be disabled if isErrorMessage is true.
 * @example <caption>Example usage of CopyButton</caption>
 * const data = 'Text to copy';
 * return(
 *  <CopyButton data={data} />
 * )
 */
const CopyButton = ({ data, isErrorMessage }) => {
  // State to track whether the data is copied.
  const [isCopied, setIsCopied] = useState(false);

  // State to track whether the button should be disabled.
  const [isDisabled, setIsDisabled] = useState(false);

  /**
   * useEffect hook to update the disabled state when the data changes.
   */
  useEffect(() => {
    setIsDisabled(!data || isErrorMessage); // Set state of isDisabled to false if data is empty
  }, [data, isErrorMessage]);

  /**
   * @function
   * Function to handle the copy to clipboard action.
   */
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(data); // Write the data to the clipboard
    setIsCopied(true); // Set isCopied to true to show the copied visuals

    // Reset isCopied to false after 2 seconds
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <button
      onClick={handleCopyToClipboard}
      disabled={isCopied || isDisabled} // Disable the button if already copied or if data is not available
      className={`copy-button ${isCopied ? 'copied' : ''} ${isDisabled ? 'disabled' : ''}`} // Apply CSS classes based on state
    >
      {isCopied ? <FaCheck /> : <FaClipboard />} {/* Render the copy or check icon based on the copied state */}
      {isCopied ? 'Copied!' : 'Copy to clipboard'} {/* Display the appropriate text based on the copied state */}
    </button>
  );
}

export default CopyButton;