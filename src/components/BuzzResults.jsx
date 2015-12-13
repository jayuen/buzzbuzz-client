import React from 'react';
const classNames = require('classnames');

export default React.createClass({
  render: function() {
    return (<div className="buzz-results">
      {this.props.buzzes.map(buzz =>
        <div key={buzz.name} className={classNames('buzz', { 'winner': buzz.winner, 'loser': !buzz.winner })}>{buzz.name}</div>
      )}
    </div>
    );
  },
});
