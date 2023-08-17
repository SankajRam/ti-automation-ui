import { useState, useEffect } from 'react';
import { clickAllRefs, isJsonEqualsOrEmpty, combineObjectsWithKey, combineObjects } from '../util/formPageHelper';
import CopiableTextBox from '../components/CopiableTextBox';
import usePostData from '../hooks/use-post-data';
import LoadingModal from '../components/LoadingModal';
import DynamicForm from '../components/DynamicForm';
import '../styles/FormPage.css';

/**
 * FormPage component for rendering a dynamic form page.
 * @component
 * @param {object} props - The component props.
 * @param {string} props.pageName - Name of the form page.
 * @param {object} props.formsData - Data object containing form configurations.
 * @param {string} props.postFormURL - URL for the API endpoint to POST the form data.
 * @param {number} props.formLimit - Maximum number of form fields allowed.
 * @param {string} props.uuid - UUID of current browser session.
 * @param {string} props.portfolio - Portfolio name to be appended infont of cloud resource's name.
 * @param {string} props.environment - Environment to be appended at the end of cloud resource's name.
 * @example
 * // Usage example:
 * <FormPage
 *   pageName="My Form"
 *   formsData={undefined}
 *   postFormURL="/api/submit-form"
 *   formLimit={10}
 *   uuid="12345"
 *   portfolio="singtel-git"
 *   environment="dev"
 * />
 */
const FormPage = ({ pageName, formsData, postFormURL, formLimit, uuid, portfolio, environment }) => {
  // State variables
  const [formJSONs, setFormJSONs] = useState({});
  const [generatedTfvars, setGeneratedTfvars] = useState('');

  // Custom hooks
  const { responseData, error, isFetching, postData, setIsFetching } = usePostData();

  /**
   * Handles the form submission by updating the formJSONs state.
   * @param {object} formJSON - Form data JSON object.
   * @param {string} formName - Name of the form.
   */
  const handleSubmit = (formJSON, formName) => {
    const newFormJSON = JSON.parse(JSON.stringify(formJSON));
    setFormJSONs((prevState) => ({
      ...prevState,
      [formName]: newFormJSON,
    }));
  };

  // Generate DynamicForms based on formsData
  const dynamicForms = Object.values(formsData).map(({ name, fields, submitRef }) => (
    <DynamicForm
      key={name}
      formFields={fields}
      formName={name}
      onFormSubmit={handleSubmit}
      submitRef={submitRef}
      formLimit={formLimit}
      portfolio={portfolio}
      environment={environment}
    />
  ));

  // Create an array of submitRefs
  const submitRefs = Object.values(formsData).map((formData) => formData.submitRef);

  // Effect to handle responseData and error updates
  useEffect(() => {
    if (responseData) {
      setGeneratedTfvars(responseData);
    }
    if (error) {
      setGeneratedTfvars(error);
    }
  }, [responseData, error]);

  // Effect to handle formJSON updates and API call
  useEffect(() => {
    // Define an empty form JSON object
    const emptyFormJSON = {
      data: [],
    };

    // Extract the form data from formJSONs
    const JSONs = Object.values(formJSONs).map((formJSON) => formJSON.data);

    // Combine form JSONs with the given key
    const combined = combineObjectsWithKey("data", ...JSONs);
    
    // If the combined form JSONs are not empty or equal to the empty form JSON, make the API call
    if (!isJsonEqualsOrEmpty(combined, emptyFormJSON)) {
      setIsFetching(true);
      postData(postFormURL, combineObjects({uuid: uuid}, combined));
    }
  }, [formJSONs, postData, setIsFetching, uuid, postFormURL]);

  return (
    <div>
      {/* Heading */}
      <h1 style={{ display: 'flex', justifyContent: 'center' }}>{pageName.toUpperCase()} Form</h1>

      {/* Render dynamicForms */}
      {dynamicForms}

      {/* Button panel */}
      <div className="button-panel">
        <button className="submit-button" onClick={() => clickAllRefs(submitRefs)}>
          Generate
        </button>
      </div>

      {/* Loading modal */}
      {isFetching && <LoadingModal>Loading...</LoadingModal>}

      {/* CopiableTextBox component */}
      <CopiableTextBox label="Generated Tfvars:" data={generatedTfvars} isErrorMessage={error} fileName={pageName} />
    </div>
  );
};

export default FormPage;
