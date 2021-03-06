import { List, Map, fromJS } from 'immutable';
import { expect } from 'chai';
import { addBuzzResult, clearBuzzes } from '../src/action_creators';

import reducer from '../src/reducer';

describe('reducer', () => {
  it('handles ADD_BUZZ_RESULT', () => {
    const buzz = { name: 'amber', winner: false };
    const action = addBuzzResult(buzz);
    const initialState = fromJS({ buzzes: [{ name: 'jason', winner: true }] });

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({ buzzes: [
      { name: 'jason', winner: true },
      { name: 'amber', winner: false }
    ]}));
  });

  it('handles ADD_BUZZ_RESULT without initial state', () => {
    const buzz = { name: 'amber', winner: true };
    const action = addBuzzResult(buzz);

    const nextState = reducer(undefined, action);

    expect(nextState).to.equal(fromJS({ buzzes: [ 
      { name: 'amber', winner: true }
    ]}));
  });

  it('handles NEW_BUZZ_SESSION', () => {
    const initialState = fromJS({ buzzes: [{ name: 'jason', winner: true }]});
    const action = clearBuzzes();

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({ buzzes: []}));
  });
});
