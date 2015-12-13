import {Map, fromJS} from 'immutable';

export default function(state = fromJS({buzzes: []}), action) {
  switch (action.type) {
    case 'ADD_BUZZ_RESULT':
      return state.update('buzzes', list => list.push(action.buzz));
    case 'RESET_BUZZ_SESSION':
      return state.clear();
  }
}
