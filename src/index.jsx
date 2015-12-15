import React from 'react';
import ReactDOM from 'react-dom';
import { BuzzResults, BuzzResultsContainer } from './components/BuzzResults';
import * as actionCreators from './action_creators';
import {Provider} from 'react-redux';
import reducer from './reducer';
import io from 'socket.io-client';
import { createStore, compose, applyMiddleware } from "redux";
import api from "./api";
import Router, {Route} from 'react-router';
import App from './components/App';

require('./stylesheets/application.scss');

// setup store and allow for HTTP requests via middleware
const store = compose(
  applyMiddleware(api)
)(createStore)(reducer);

// setup socket.io connection to listen to async events
const socket = io.connect('localhost:5001');
socket.on('buzz', function(buzz) {
  store.dispatch(actionCreators.addBuzzResult(buzz));
});
socket.on('new-buzz-session', function() {
  store.dispatch(actionCreators.clearBuzzes());
});

// create a new buzz session every time the page reloads
store.dispatch(actionCreators.resetBuzzSessionViaApi());

// setup routes
const routes = <Route component={App}>
  <Route path="/buzz_session" component={BuzzResultsContainer} />
</Route>;

ReactDOM.render(
  <Provider store={store}>
    <Router>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);
