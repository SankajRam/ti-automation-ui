import { useState } from 'react';
import { Combobox } from 'react-widgets';
import config from './config.json';
import '../../styles/PipelinePage.css'; // Create the CSS file to style the table if needed
import CopiableTextBox from '../../components/CopiableTextBox';

const PipelinePage = () => {
  const [pat, setPat] = useState('');

  
  // Function to handle rendering the password input value
  const renderPasswordValue = (value) => {
    if (!value || value === '') {
      return '';
    }

    const maskedValue = '*'.repeat(value.length); // Mask the input with asterisks
    return maskedValue;
  };


  return (
    <>
      <div className='pat'>
        <div className='pat-grid'>
          {/* Portfolio field */}
          <div className='pat-field'>
            <label>Personal Access Token:</label>
            {/* Combobox for portfolio */}
            <Combobox type="password" hideCaret hideEmptyPopup value={pat} onChange={value => setPat(value)} renderValue={renderPasswordValue} />
          </div>
        </div>
      </div>
      <div className="pipeline-table">
        <table>
          <thead>
            <tr>
              <th>Pipeline</th>
              <th>Run Plan</th>
              <th>Run Apply</th>
              <th>Show Logs</th>
            </tr>
          </thead>
          <tbody>
            {config.pipelines.map((pipeline, index) => (
              <tr key={index}>
                <td>{pipeline.projectKey}-{pipeline.buildKey}</td>
                <td><button className="pipeline-button">Run Plan</button></td>
                <td><button className="pipeline-button">Run Apply</button></td>
                <td><button className="pipeline-button">Logs</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        {/* CopiableTextBox component */}
        <CopiableTextBox label="Logs:" data={""} isErrorMessage={false} fileName={"logs"} />
      </div>
    </>
  );
};

export default PipelinePage;
