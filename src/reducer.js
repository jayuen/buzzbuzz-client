import {Map, fromJS} from 'immutable';

export default function(state = List(), action) {
  switch (action.type) {
    case 'ADD_BUZZ_RESULT':
      return state.push(fromJS(action.buzz));
    case 'RESET_BUZZ_SESSION':
      return state.clear();
  }
}
