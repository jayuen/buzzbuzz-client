import React from 'react';
import ReactDOM from 'react-dom';
import { BuzzResults, BuzzResultsContainer } from './components/BuzzResults';
import {createStore} from 'redux';
import { addBuzzResult, resetBuzzSession } from './action_creators';
import {Provider} from 'react-redux';
import reducer from './reducer';

require('./stylesheets/application.scss');

const store = createStore(reducer);
store.dispatch(addBuzzResult({ name: 'jason', winner: true }));
store.dispatch(addBuzzResult({ name: 'amber', winner: false }));
store.dispatch(addBuzzResult({ name: 'marlowe', winner: false }));

const buzzes = [
  { name: 'jason', winner: true },
  { name: 'amber', winner: false },
  { name: 'marlowe', winner: false },
];

//ReactDOM.render(
//  <Provider store={store}>
//    <BuzzResultsContainer />,
//  </Provider>,
//  document.getElementById('app')
//);

ReactDOM.render(
  <BuzzResults buzzes={buzzes}/>,
  document.getElementById('app')
);
