import { useRef } from 'react';
import useGetData from '../../hooks/use-get-data';
import FormPage from '../../components/FormPage';
import config from './config.json';

/**
 * LbFormPage component for rendering the LB form page.
 * Retrieves data from JSON file and API endpoint to populate the form.
 * @param {object} props
 * @param {string} props.uuid - UUID of current browser session.
 * @param {string} props.portfolio - Portfolio name to be appended infont of cloud resource's name.
 * @param {string} props.environment - Environment to be appended at the end of cloud resource's name.
 * @returns {JSX.Element} - JSX element representing the LB form page.
 */
const LbFormPage = ({ uuid, portfolio, environment }) => {
  // read data from config file
  const { pageName, formLimit, postFormRoute, getKeysRoute, formsData } = config;

  // Fetch necessary data using custom hooks
  const { getDataWithKey } = useGetData(process.env.REACT_APP_API_BASE_URL + getKeysRoute, uuid);

  // Assign fetched keys to relavent selectionLists
  formsData.lbFormData.fields.find(field => field.name === 'resource_group_key').selectionList = getDataWithKey('rg');

  // Create a new submitRef for the form
  formsData.lbFormData.submitRef = useRef();

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

export default LbFormPage;
