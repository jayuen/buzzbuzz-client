import React from 'react';
import {connect} from 'react-redux';
const classNames = require('classnames');

export const BuzzResults = React.createClass({
  render: function() {
    return (<div className="buzz-results">
      {this.props.buzzes.map(buzz =>
        <div key={buzz.name} className={classNames('buzz', { 'winner': buzz.winner, 'loser': !buzz.winner })}>{buzz.name}</div>
      )}
    </div>
    );
  },
});

function mapStateToProps(state) {
  return {
    buzzes: state.get('buzzes')
  };
}

export const BuzzResultsContainer = connect(mapStateToProps)(BuzzResults);
