import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
const classNames = require('classnames');
import * as actionCreators from '../action_creators';

export const Buzzer = React.createClass({
  submit: function() {
    const data = {
      name: ReactDOM.findDOMNode(this.refs.name).value
    };
    this.props.buzz(data); 
  },

  render: function() {
    return (
      <div className="buzzer">
        <div>
          <label>Team name</label>
          <input className='buzzer-name' ref='name' type='text' ></input>
        </div>
        <div>
          <button className='buzzer-button' onClick={() => this.submit()}>BUZZ</button>
        </div>
      </div>
    );
  },
});

function mapStateToProps(state) {
  return {};
}

export const BuzzerContainer = connect(mapStateToProps, actionCreators)(Buzzer);
