import React from 'react';
import ReactDOM from 'react-dom';
import BuzzResults from './components/BuzzResults';
require('./stylesheets/application.scss');

const buzzes = [
  { name: 'jason', winner: true },
  { name: 'amber', winner: false },
  { name: 'marlowe', winner: false },
];

ReactDOM.render(
  <BuzzResults buzzes={buzzes}/>,
  document.getElementById('app')
);
