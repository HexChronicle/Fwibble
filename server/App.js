var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var browserHistory = ReactRouter.browserHistory;

// var Stylesheet = require('../public/styles.css');
var Index = require('../app/components/index/Index');
var Signin = require('../app/components/signin/Signin');
var Signup = require('../app/components/signup/Signup');
var Gameview = require('../app/components/gameview/GameView');



var App = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {username: null}
  },

  setUser: function(username) {
    console.log("App setUser called with", username)
    this.setState({
      username: username
    })
  },

  render: function() {
    return (
      <div>
        <div className='navbar navbar-default navbar-static-top'>
          <div className='container'>
            <Link to='/' className='navbar-brand'>Fwibble</Link>
            <ul className='nav navbar-nav navbar-right' className='nav-links' className='list-inline'>
              <li><button type='button' className='btn btn-lg btn-success'><Link to='/signin'>Sign In</Link></button></li>
              <li><button type='button' className='btn btn-lg btn-success'><Link to='/gameview'>Game</Link></button></li>
            </ul>
          </div>
        </div>
          {this.props.children && React.cloneElement(this.props.children, {
            setUser: this.setUser,
            user: this.state.username
          })}
      </div>
    )
  }
})

ReactDOM.render(
  (
        <Router history={browserHistory} >
          <Route path='/' component={App} >
            <Route path='signin' component={Signin}/>
            <Route path='signup' component={Signup}/>
            <Route path='gameview' component={Gameview}/>
          </Route>
        </Router>
  ), document.getElementById('app')
)