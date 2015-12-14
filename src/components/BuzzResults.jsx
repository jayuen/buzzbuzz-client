import React from 'react';
import {connect} from 'react-redux';
const classNames = require('classnames');
import * as actionCreators from '../action_creators';

export const BuzzResults = React.createClass({
  classes: function(buzz) {
    return classNames('buzz', { 'winner': buzz.get('winner'), 'loser': !buzz.get('winner') })
  },

  render: function() {
    return (
      <div>
        <div>
          <button onClick={() => this.props.resetBuzzSession()}>New buzz session</button>
        </div>
        <div className="buzz-results">
        {this.props.buzzes.map(buzz =>
          <div key={buzz.get('id')} className={this.classes(buzz)}>{buzz.get('name')}</div>
        )}
        </div>
      </div>
    );
  },
});

function mapStateToProps(state) {
  return {
    buzzes: state.get('buzzes')
  };
}

export const BuzzResultsContainer = connect(mapStateToProps, actionCreators)(BuzzResults);
