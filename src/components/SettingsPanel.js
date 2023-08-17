import { DropdownList, Combobox } from 'react-widgets';
import '../styles/SettingsPanel.css';

/**
 * SettingsPanel component for rendering the settings panel.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.portfolio - Portfolio name to be appended infont of cloud resource's name.
 * @param {Function} props.onPortfolioChange - Callback function to handle portfolio changes.
 * @param {string} props.environment - Environment to be appended at the end of cloud resource's name.
 * @param {Function} props.onEnvironmentChange - Callback function to handle environment changes.
 * @returns {JSX.Element} JSX element representing the settings panel.
 */
const SettingsPanel = ({ portfolio, onPortfolioChange, environment, onEnvironmentChange }) => {
  return (
    <div className='settings'>
      <div className='settings-grid'>
        {/* Portfolio field */}
        <div className='settings-field'>
          <label>Portfolio:</label>
          {/* Combobox for portfolio */}
          <Combobox type="text" hideCaret hideEmptyPopup value={portfolio} onChange={value => onPortfolioChange(value)} />
        </div>

        {/* Environment field */}
        <div className='settings-field'>
          <label>Environment:</label>
          {/* DropdownList for environment */}
          <DropdownList data={["dev", "nprd", "prd"]} value={environment} onChange={value => onEnvironmentChange(value)} />
        </div>
      </div>
    </div>
  );
}

export default SettingsPanel;
