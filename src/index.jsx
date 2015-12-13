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
store.dispatch(resetBuzzSession());

const socket = io.connect('localhost:5001');
socket.on('buzz', function(buzz) {
  store.dispatch(addBuzzResult(buzz));
});
socket.on('new-buzz-session', function(newBuzzSession) {
  store.dispatch(resetBuzzSession());
});

ReactDOM.render(
  <Provider store={store}>
    <BuzzResultsContainer />
  </Provider>,
  document.getElementById('app')
);
