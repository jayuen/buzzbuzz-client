import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import Router, {Route} from 'react-router';
import { createStore, compose, applyMiddleware } from "redux";
import io from 'socket.io-client';

import { BuzzResultsContainer } from './components/BuzzResults';
import { BuzzerContainer } from './components/Buzzer';
import App from './components/App';

import * as actionCreators from './action_creators';
import reducer from './reducer';
import api from "./api";

require('./stylesheets/application.scss');

// setup store and allow for HTTP requests via middleware
const store = compose(
  applyMiddleware(api)
)(createStore)(reducer);

// setup socket.io connection to listen to async events
const socket = io.connect('projohn.local:5001');
socket.on('buzz', function(buzz) {
  store.dispatch(actionCreators.addBuzzResult(buzz));
});
socket.on('new-buzz-session', function() {
  store.dispatch(actionCreators.clearBuzzes());
});

// setup routes
const routes = <Route component={App}>
  <Route path="/buzz_session" component={BuzzResultsContainer} />
  <Route path="/" component={BuzzerContainer} />
</Route>;

ReactDOM.render(
  <Provider store={store}>
    <Router>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);
