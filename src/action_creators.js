import { CALL_API } from "./api";

const SERVER_URL = "projohn.local:3000";

export function addBuzzResult(buzz) {
  return {
    type: 'ADD_BUZZ_RESULT',
    buzz: buzz
  };
}

export function clearBuzzes() {
  return {
    type: 'CLEAR_BUZZES'
  };
}

export function resetBuzzSessionViaApi() {
  return {
    [CALL_API]: {
      types: [
        'RESET_BUZZ_SESSION_REQUEST',
        'RESET_BUZZ_SESSION_SUCCESS',
        'RESET_BUZZ_SESSION_FAILURE'
      ],
      endpoint: 'http://' + SERVER_URL + '/buzz_sessions'
    }
  };
}

export function buzz(data) {
  return {
    [CALL_API]: {
      types: [
        'BUZZ_REQUEST',
        'BUZZ_SUCCESS',
        'BUZZ_FAILURE'
      ],
      endpoint: 'http://' + SERVER_URL + '/buzzes',
      requestData: data
    }
  };
}

