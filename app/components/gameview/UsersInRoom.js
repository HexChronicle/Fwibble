var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({
  
  render: function (){
    return (
      <div className='users'>
        <div className="card card-block text-xs-right">
            <div className="card">
              <h4 className="card-header">
                Users in room
              </h4>
              <div className="card-block">
                <blockquote className="card-blockquote">
                  <div>
                    <ul>
                      {
                        this.props.users.map((user, i) => {
                          return (
                            <li key={i}>
                              {user}
                            </li>
                          );
                        })
                      }
                    </ul>
                  </div>
                </blockquote>
              </div>
            </div>
        </div>
      </div>
    );
  }
});

