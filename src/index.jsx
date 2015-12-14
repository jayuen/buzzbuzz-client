import React from 'react';
import ReactDOM from 'react-dom';
import { BuzzResults, BuzzResultsContainer } from './components/BuzzResults';
import * as actionCreators from './action_creators';
import {Provider} from 'react-redux';
import reducer from './reducer';
import io from 'socket.io-client';
import { createStore, compose, applyMiddleware } from "redux";
import api from "./api";

require('./stylesheets/application.scss');

const store = compose(
  applyMiddleware(api)
)(createStore)(reducer);

const socket = io.connect('localhost:5001');
socket.on('buzz', function(buzz) {
  store.dispatch(actionCreators.addBuzzResult(buzz));
});
socket.on('new-buzz-session', function() {
  store.dispatch(actionCreators.resetBuzzSession());
});
store.dispatch(actionCreators.resetBuzzSession());

ReactDOM.render(
  <Provider store={store}>
    <BuzzResultsContainer />
  </Provider>,
  document.getElementById('app')
);
