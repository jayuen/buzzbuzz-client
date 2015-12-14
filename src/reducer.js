import {List, Map, fromJS} from 'immutable';

export default function(state = fromJS({buzzes: []}), action) {
  switch (action.type) {
    case 'ADD_BUZZ_RESULT':
      return state.update('buzzes', list => list.push(fromJS(action.buzz)));
    case 'RESET_BUZZ_SESSION':
      return state.update('buzzes', list => list.clear());
  }
}
