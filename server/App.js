var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var browserHistory = ReactRouter.browserHistory;

var Stylesheet = require('../public/styles.css');
var Index = require('../app/components/index/Index');
var NavBar = require('../app/components/navbar/NavBar.js');
var Signin = require('../app/components/signin/Signin');
var Signup = require('../app/components/signup/Signup');
var Signout = require('../app/components/signout/Signout')
var Gameview = require('../app/components/gameview/GameView');
var Auth = require('./auth');


var App = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {

    return {username: null, loggedIn: Auth.loggedIn()}
  },

  setUser: function(username) {
    console.log("App setUser called with", username);
    console.log("logged in?", Auth.loggedIn())
    Auth.login();
    this.setState({
      username: username,
      loggedIn: Auth.loggedIn()
    })
    this.context.router.replace('/gameview')
  },
  logoutUser: function(){
    Auth.logout();
    this.setState({
      username: null,
      loggedIn: Auth.loggedIn()
    })
  },

  render: function() {
    return (
      <div>
        <NavBar />
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
            <IndexRoute component={Index} onEnter={Auth.requireAuth} />
            <Route path='signin' component={Signin}/>
            <Route path='signup' component={Signup}/>
            <Route path='signout' component={Signout}/>
            <Route path='gameview' component={Gameview} onEnter={Auth.requireAuth}/>
          </Route>
        </Router>
  ), document.getElementById('app')
)