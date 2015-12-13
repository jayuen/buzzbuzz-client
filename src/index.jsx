import React from 'react';
import ReactDOM from 'react-dom';
import { BuzzResults, BuzzResultsContainer } from './components/BuzzResults';
import {createStore} from 'redux';
import { addBuzzResult, resetBuzzSession } from './action_creators';
import {Provider} from 'react-redux';
import reducer from './reducer';
import io from 'socket.io-client';

require('./stylesheets/application.scss');

const store = createStore(reducer);
store.dispatch(addBuzzResult({ name: 'jason', winner: true }));
store.dispatch(addBuzzResult({ name: 'amber', winner: false }));
store.dispatch(addBuzzResult({ name: 'marlowe', winner: false }));

const socket = io.connect('localhost:5001');
socket.on('buzz', function(state) {
  console.log('receiving buzz');
});
socket.on('new-buzz-session', function(state) {
  console.log('receiving new-buzz-session');
});

ReactDOM.render(
  <Provider store={store}>
    <BuzzResultsContainer />
  </Provider>,
  document.getElementById('app')
);

//const buzzes = [
//  { name: 'jason', winner: true },
//  { name: 'amber', winner: false },
//  { name: 'marlowe', winner: false },
//];
//
//ReactDOM.render(
//  <BuzzResults buzzes={buzzes}/>,
//  document.getElementById('app')
//);
//

