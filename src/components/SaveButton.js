import { useEffect, useState } from 'react';
import { FaSave } from 'react-icons/fa';
import '../styles/SaveButton.css';

/**
 * SaveButton component for saving data as a file.
 * @param {object} props
 * @param {string} props.data - The content to be saved as a file.
 * @param {string} props.defaultFileExtension - The default file extension to be appended if the user doesn't provide one.
 * @param {boolean} props.isErrorMessage - Button will be disabled if isErrorMessage is true.
 */
function SaveButton({ data, fileName, defaultFileExtension, isErrorMessage }) {
  const [isDisabled, setIsDisabled] = useState(false);

  /**
   * useEffect hook to update the disabled state of the button based on the presence of data.
   */
  useEffect(() => {
    setIsDisabled(!data || isErrorMessage);
  }, [data, isErrorMessage]);

  /**
   * Event handler for the button click, initiates the file download.
   */
  const handleSave = () => {
    if (fileName) {
      const extension = fileName.includes('.');
      const formattedFileName = extension ? fileName : fileName + '.' + defaultFileExtension;
      const dataBlob = new Blob([data], { type: 'text/plain' });
      const linkElement = document.createElement('a');
      linkElement.href = window.URL.createObjectURL(dataBlob);
      linkElement.download = formattedFileName;
      linkElement.click();
    }
  };

  return (
    <button
      onClick={handleSave}
      className="save-button"
      disabled={isDisabled}
    >
      <FaSave />
      Save as File
    </button>
  );
}

export default SaveButton;
