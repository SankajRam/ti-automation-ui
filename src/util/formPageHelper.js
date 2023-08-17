/**
 * Click all the references in the provided array.
 * @param {Array} refs - Array of references to be clicked.
 */
export const clickAllRefs = (refs) => {
  refs.forEach((ref) => {
    ref.current.click();
  });
};

/**
 * Check if the provided JSON object is equal to an empty object or empty string.
 * @param {object} jsonObject - The JSON object to compare.
 * @param {object} emptyObject - The empty object for comparison.
 * @returns {boolean} - True if the JSON object is empty or equal to the empty object, false otherwise.
 */
export const isJsonEqualsOrEmpty = (jsonObject, emptyObject) => {
  const jsonString = JSON.stringify(jsonObject);
  if (jsonString === '{}' || jsonString === JSON.stringify(emptyObject)) {
    return true;
  }
  return false;
};

/**
 * Validate the JSON object and return a formatted JSON string.
 * @param {object} jsonObject - The JSON object to validate and format.
 * @param {object} emptyObject - The empty object for comparison.
 * @returns {string} - The formatted JSON string if the JSON object is not empty or equal to the empty object, an empty string otherwise.
 */
export const validatedJsonString = (jsonObject, emptyObject) => {
  if (isJsonEqualsOrEmpty(jsonObject, emptyObject)) {
    return '';
  }
  return JSON.stringify(jsonObject, null, 2);
};

/**
 * Combine multiple objects into a single object using a specified key.
 * @param {string} key - The key to assign to the combined object.
 * @param {...object} objects - Objects to be combined.
 * @returns {object} - The combined object with the specified key.
 */
export const combineObjectsWithKey = (key, ...objects) => {
  const filteredObjects = objects.filter((obj) => obj !== null && obj !== undefined);

  if (filteredObjects.length === 0) {
    return { [key]: [] };
  }

  const combinedArray = filteredObjects.reduce((acc, obj) => {
    if (Array.isArray(obj)) {
      return acc.concat(obj);
    } else {
      acc.push(obj);
      return acc;
    }
  }, []);

  return { [key]: combinedArray };
};

/**
 * Combines multiple objects into a single object.
 * @param {...object} objects - Objects to be combined.
 * @returns {object} - The combined object.
 */
export const combineObjects = (...objects) => {
  return objects.reduce((result, obj) => {
    return { ...result, ...obj };
  }, {});
};