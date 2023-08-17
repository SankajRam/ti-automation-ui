import { useRef } from 'react';
import FormPage from '../../components/FormPage';
import config from './config.json';

/**
 * RgFormPage component for rendering the RG form page.
 * @param {object} props
 * @param {string} props.uuid - UUID of current browser session.
 * @param {string} props.portfolio - Portfolio name to be appended infont of cloud resource's name.
 * @param {string} props.environment - Environment to be appended at the end of cloud resource's name.
 * @returns {JSX.Element} - JSX element representing the RG form page.
 */
const RgFormPage = ({ uuid, portfolio, environment }) => {
  // read data from config file
  const { pageName, formLimit, postFormRoute, formsData } = config;

  // Create a new submitRef for the form
  formsData.rgFormData.submitRef = useRef();

  // Render the FormPage component with the provided form data
  return (
    <FormPage
      pageName={pageName}
      formsData={formsData}
      postFormURL={process.env.REACT_APP_API_BASE_URL + postFormRoute} 
      formLimit={formLimit}
      uuid={uuid}
      portfolio={portfolio}
      environment={environment}
    />
  );
};

export default RgFormPage;
