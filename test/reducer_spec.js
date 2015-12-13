import { List, Map, fromJS } from 'immutable';
import { expect } from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {
  it('handles ADD_BUZZ_RESULT', () => {
    const initialState = fromJS([{ name: 'jason', winner: true }])
    const action = {
      type: 'ADD_BUZZ_RESULT',
      buzz: { name: 'amber', winner: false }
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS([
      { name: 'jason', winner: true },
      { name: 'amber', winner: false }
    ]));
  });

  it('handles NEW_BUZZ_SESSION', () => {
    const initialState = fromJS([{ name: 'jason', winner: true }]);
    const action = { type: 'RESET_BUZZ_SESSION' };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS([]));
  });
});
