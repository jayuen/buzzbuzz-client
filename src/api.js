import axios from "axios";

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
function callApi(endpoint, requestData = {} ) {
  return axios.post(endpoint, requestData);
}

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol("Call API");

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default _store => next => action => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === "undefined") {
    return next(action);
  }

  const { types, endpoint, requestData } = callAPI;

  if (typeof endpoint !== "string") {
    throw new Error("Specify a string endpoint URL.");
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error("Expected an array of three action types.");
  }
  if (!types.every(type => typeof type === "string")) {
    throw new Error("Expected action types to be strings.");
  }

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  }

  const [ requestType, successType, failureType ] = types;
  next(actionWith({ type: requestType }));

  return callApi(endpoint, requestData).then(
    response => next(actionWith({
      data: response.data,
      type: successType
    })),
    error => next(actionWith({
      type: failureType,
      error: error.message || "Something bad happened"
    }))
);
};

