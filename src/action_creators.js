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
