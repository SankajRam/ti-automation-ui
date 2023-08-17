import { useForm,useFieldArray, Controller } from 'react-hook-form';
import { useEffect } from 'react';
import { Combobox, DropdownList } from 'react-widgets';
import '../styles/DynamicForm.css';
import 'react-widgets/styles.css';

/**
 * DynamicForm component for rendering and managing a dynamic form.
 *
 * @component
 * @param {object} props - Component props
 * @param {Array} props.formFields - Array of form field configurations.
 * @param {string} props.formName - Name of the form.
 * @param {function} props.onFormSubmit - Callback function for form submission.
 * @param {object} props.submitRef - Reference to the submit button.
 * @param {number} props.formLimit - Maximum number of form fields allowed.
 * @param {string} props.portfolio - Portfolio name to be appended infont of cloud resource's name.
 * @param {string} props.environment - Environment to be appended at the end of cloud resource's name.
 * @example
 * // Example usage of DynamicForm
 * const formFields = [
 *   {
 *     name: 'firstName',
 *     label: 'First Name',
 *     type: 'input'
 *   },
 *   {
 *     name: 'gender',
 *     label: 'Gender',
 *     type: 'select',
 *     selectionList: ["Male", "Female"]
 *   },
 *   // Add more form field configurations as needed
 * ];
 * const formName = 'person';
 * const onFormSubmit = (data, formName) => {
 *   console.log(`Submitted ${formName} form data:`, data);
 * };
 * const submitRef = useRef();
 * const formLimit = 2;
 * const portfolio = "singtel-git";
 * const environment = "dev";
 *
 * <DynamicForm
 *   formFields={formFields}
 *   formName={formName}
 *   onFormSubmit={onFormSubmit}
 *   submitRef={submitRef}
 *   formLimit={formLimit}
 * />
 */
function DynamicForm({ formFields, formName, onFormSubmit, submitRef, formLimit, portfolio, environment }) {
  const formKey = "data";

  // Initialize form using react-hook-form
  const {
    register,
    control,
    handleSubmit,
    reset,
  } = useForm({});

  // Get form field array and its operations (append, remove)
  const { fields, append, remove } = useFieldArray({
    control,
    name: formKey,
  });

  // Form submission handler
  const onSubmit = (data) => {
    const newData = {};
    newData["data"] = data["data"].map((item) => {
      if (item.name) {
        const userEnteredValue = item.name;
        item.name = `${portfolio}-${userEnteredValue}-${environment}`;
      }
      return item;
    });

    onFormSubmit(newData, formName);
  };

  // Reset form handler
  const handleReset = () => {
    reset();
  };

  /**
   * Capitalizes the first character of a string.
   * @param {string} str - The string to capitalize.
   * @returns {string} The capitalized string.
   */
  const capitalizeFirstCharacter = (str) => {
    if (typeof str !== 'string') {
      throw new Error('Input must be a string');
    }

    if (str.length === 0) {
      return str;
    }

    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  /**
   * Generates a default value based on conditions.
   * @param {string} value - The value to be processed.
   * @param {boolean} appendIndex - Whether to append the index to the default value.
   * @param {number} index - The index of the form field.
   * @returns {string} The generated default value.
   */
  const generateDefaultValue = (value, appendIndex, index) => {
    if (value === undefined) {
      return "";
    }

    if (appendIndex !== undefined && appendIndex) {
      return value + "_" + index;
    }

    return value;
  }

    /**
   * useEffect hook to start off the page with one opened form.
   */
    useEffect(() => {
      append({});
    }, [append]);

  return (
    <div>
      <form className="dynamic-form" onSubmit={handleSubmit(onSubmit)} onReset={handleReset}>
        {/* Display a message if no fields exist */}
        {fields.length !== 0 || <h2>Click "Add New {capitalizeFirstCharacter(formName)} Form" button to get started</h2>}
        <div className="form-grid">
          {/* Render each field */}
          {fields.map((field, index) => (
            <div className="form-field" key={field.id}>
              <h4 className="form-label">
                {capitalizeFirstCharacter(formName)} {index}
              </h4>
              {/* Render form fields based on formFields configuration */}
              {formFields.map(({ name, label, type, isDisabled, isHidden, defaultValue, appendIndex, selectionList, placeholder }) => (
                <div key={name}>
                  {/* Render label if not hidden */}
                  {!isHidden && <label>{label}:</label>}
                  {/* set default value and hide input field if hidden */}
                  {isHidden && (
                    <input
                      name={`${formKey}.${index}.${name}`}
                      type="hidden"
                      defaultValue={generateDefaultValue(defaultValue, appendIndex, index)}
                      {...register(`${formKey}.${index}.${name}`)}
                    />
                  )}
                  {/* Render input field */}
                  {type === 'input' && !isHidden && (
                    <Controller
                      control={control}
                      name={`${formKey}.${index}.${name}`}
                      defaultValue={generateDefaultValue(defaultValue, appendIndex, index)}
                      render={({ field }) => (
                        <Combobox
                          disabled={isDisabled}
                          hideCaret
                          hideEmptyPopup
                          onChange={field.onChange}
                          value={field.value}
                          placeholder={placeholder ? placeholder : ""}
                        />
                      )}
                    />
                  )}
  
                  {/* Render select or combobox field */}
                  {(type === 'select' || type === 'combobox') && !isHidden && (
                    <Controller
                      control={control}
                      name={`${formKey}.${index}.${name}`}
                      defaultValue={generateDefaultValue(selectionList ? selectionList[0] : [],  appendIndex, index)}
                      render={({ field }) => (
                        <>
                          {type === 'select' ? (
                            <DropdownList
                              disabled={isDisabled}
                              data={selectionList}
                              value={field.value}
                              onChange={field.onChange}
                            />
                          ) : (
                            <Combobox
                              disabled={isDisabled}
                              data={selectionList}
                              value={field.value}
                              onChange={field.onChange}
                            />
                          )}
                        </>
                      )}
                    />
                  )}
                </div>
              ))}
              <br />
              {/* Remove form field button */}
              <button className="remove-button" type="button" onClick={() => remove(index)}>
                Remove {capitalizeFirstCharacter(formName)} {index} Form
              </button>
              <hr />
            </div>
          ))}
        </div>
        {/* Add new form field button; Button is hidden if form limit is reached*/}
        <button hidden={fields.length >= formLimit} className="add-button" type="button" onClick={() => append({})}>
          Add New {capitalizeFirstCharacter(formName)} Form
        </button>
        <br />
        {/* Reset form button */}
        <button className="reset-button" type="reset">
          Clear All {capitalizeFirstCharacter(formName)} Form Fields
        </button>
        <br />
        {/* Submit form button */}
        <button ref={submitRef} type="submit" style={{ display: 'none' }}>
          Generate {capitalizeFirstCharacter(formName)} JSON
        </button>
      </form>
    </div>
  );
}

export default DynamicForm;
