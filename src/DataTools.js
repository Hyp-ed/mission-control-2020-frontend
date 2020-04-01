/**
 * Recursively walk the data object using a list of keys.
 *
 * @param {object} data – object to be walked
 * @param {array} path – contains object keys
 * @returns data point object
 */
const getDataPoint = (data, path) => {
  if (!data) {
    console.error("Data not initialized.");
    return undefined;
  }
  if (!path) {
    console.error("Path not initialized.");
    return undefined;
  }
  if (Array.isArray(data)) {
    let key = path[0];
    path = path.slice(1);
    data = data.find(o => o.name === key);
  } else if (data.hasOwnProperty("value") && Array.isArray(data.value)) {
    let key = path[0];
    path = path.slice(1);
    data = data.value.find(o => o.name === key);
  } else if (typeof data === "object" && data !== null) {
    if (path.length === 0) {
      return data;
    }
    let key = path[0];
    data = data[key];
    path = path.slice(1);
  } else {
    return undefined;
  }
  return getDataPoint(data, path);
};

export const getDataPointValue = (data, path) => {
  return getDataPoint(data, path).value;
};
