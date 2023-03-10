const BASE_URL = process.env.REACT_APP_STACK_URL;

/**
 * Request to create a new tablature document in MongoDB.
 * @param {Object} tablature
 * @param {string} idToken
 * @returns {Object} The newly created tablature document
 */
const create = async (tablature, idToken) => {
  const payload = {
    tablature,
  };
  const response = await fetch(`${BASE_URL}/tablature`, {
    method: "POST",
    headers: {
      Authorization: idToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return response.json();
};

/**
 * Request to update a tablature document in MongoDB.
 * @param {Object} tab
 * @param {string} idToken
 * @returns {Object} { status: "" }
 */
const update = async (tablature, idToken, cognitoUsername) => {
  const payload = {
    tablature,
    cognitoUsername
  }
  const response = await fetch(`${BASE_URL}/tablature/${tablature._id}`, {
    method: "PUT",
    headers: {
      Authorization: idToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return response.json();
};

/**
 * Request to delete a tab from MongoDB.
 * @param {string} tab_id
 * @param {string} idToken
 * @returns {Object} { status: "" }
 */
const deleteTab = async (tab_id, idToken, cognitoUsername) => {
  const payload = { 
    tab_id,
    cognitoUsername
  };

  const response = await fetch(`${BASE_URL}/tablature/${tab_id}`, {
    method: "DELETE",
    headers: {
      Authorization: idToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return response.json();
};

export {
  create,
  update,
  deleteTab,
};
