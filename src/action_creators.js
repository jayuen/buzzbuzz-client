import { CALL_API } from "./api";

export function addBuzzResult(buzz) {
  return {
    type: 'ADD_BUZZ_RESULT',
    buzz: buzz
  };
}

export function resetBuzzSession() {
  return {
    type: 'RESET_BUZZ_SESSION'
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
      endpoint: 'http://localhost:3000/buzz_sessions'
    }
  };
}

