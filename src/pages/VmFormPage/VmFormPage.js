import { useRef } from 'react';
import FormPage from '../../components/FormPage';
import useGetData from '../../hooks/use-get-data';
import config from './config.json';

/**
 * VmFormPage component for rendering the VM form page.
 * @param {object} props
 * @param {string} props.uuid - UUID of current browser session.
 * @param {string} props.portfolio - Portfolio name to be appended infont of cloud resource's name.
 * @param {string} props.environment - Environment to be appended at the end of cloud resource's name.
 * @returns {JSX.Element} - JSX element representing the VM form page.
 */
const VmFormPage = ({ uuid, portfolio, environment }) => {
  // read data from config file
  const { pageName, formLimit, postFormRoute, getKeysRoute, formsData } = config;
  
  // Fetch necessary data using custom hooks
  const { getDataWithKey } = useGetData(process.env.REACT_APP_API_BASE_URL + getKeysRoute, uuid);

  // Assign fetched keys to relavent selectionLists
  formsData.winVmFormData.fields.find(field => field.name === 'resource_group_key').selectionList = getDataWithKey('rg');
  formsData.linVmFormData.fields.find(field => field.name === 'resource_group_key').selectionList = getDataWithKey('rg');

  // Create new submitRefs for the form
  formsData.winVmFormData.submitRef = useRef();
  formsData.linVmFormData.submitRef = useRef();

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

export default VmFormPage;