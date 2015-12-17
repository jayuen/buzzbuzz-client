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

const audioContext = new AudioContext();
let audioBuffer;
const request = new XMLHttpRequest();
request.open('GET', 'sound1.mp3', true);
request.responseType = 'arraybuffer';
request.onload = function () {
  const undecodedAudio = request.response;
  audioContext.decodeAudioData(undecodedAudio, function (buffer) {
    audioBuffer = buffer;
  });
};
request.send();

// setup socket.io connection to listen to async events
const socket = io.connect('projohn.local:5001');
socket.on('buzz', function(buzz) {
  if (buzz.winner === true) {
    const sourceBuffer = audioContext.createBufferSource();
    sourceBuffer.buffer = audioBuffer;
    sourceBuffer.connect(audioContext.destination);
    sourceBuffer.start(audioContext.currentTime);
  }

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
