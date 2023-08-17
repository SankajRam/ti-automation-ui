import React from 'react';
import CopyButton from './CopyButton';
import SaveButton from './SaveButton';
import '../styles/CopiableTextBox.css';

/**
 * CopiableTextBox component for rendering a text box with copy and save buttons.
 *
 * @component
 * @param {object} props - Component props
 * @param {string} props.label - The label for the text box.
 * @param {string} props.data - The text data to be displayed and manipulated.
 * @param {boolean} props.isErrorMessage - Indicates if the text should be displayed as an error message.
 * @param {string} props.fileName - This will be used as fileName for the SaveButton
 * @returns {JSX.Element} Rendered CopiableTextBox component
 * @example
 * // Example usage of CopiableTextBox
 * const data = 'Example Text';
 * const label = 'Sample Label';
 * const isErrorMessage = false;
 * const pageName = 'Sample Name';
 *
 * return (
 *  <CopiableTextBox
 *   label={label}
 *   data={data}
 *   isErrorMessage={isErrorMessage}
 *   pageName={pageName}
 *  />
 * )
 */
const CopiableTextBox = ({ label, data, isErrorMessage, fileName }) => {
  return (
    <div className={`output ${isErrorMessage ? 'error' : ''}`}>
      {/* Render the label */}
      <h3>{label}</h3>
      <div className="button-container">
        {/* Render the SaveButton component */}
        <SaveButton data={data} defaultFileExtension="tfvars" fileName={fileName} isErrorMessage={isErrorMessage}/>
        {/* Render the CopyButton component */}
        <CopyButton data={data} isErrorMessage={isErrorMessage}/>
      </div>
      {/* Render the textarea */}
      <textarea
        value={data}
        readOnly
        rows={10}
        cols={50}
        className={isErrorMessage ? 'error' : ''}
      />
    </div>
  );
}

export default CopiableTextBox;