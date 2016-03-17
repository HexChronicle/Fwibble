var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({

  render: function() {
    return (
  <div className="navbar navbar-default navbar-static-top">
    <div className="container-fluid">
      <div className="navbar-header">
        <a className="navbar-brand" href="/">Fwibble</a>
      </div>
        <ul className="nav navbar-nav navbar-right">
          <li><a className="menuOptions" href="/signin">Sign In</a></li>
          <li><a className="menuOptions" href="/gameview">Game</a></li>
        </ul>
      </div>
    </div>
)
  }
});