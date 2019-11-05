import React from 'react';
import './App.css';
import { Menu, Sidebar, Icon } from "semantic-ui-react";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import Login from './containers/Login';
import NavBarOpener from './componentsNavBar/NavBarOpener';
import Profile from './containers/Profile';
import Schedule from './containers/Schedule';
import Chart from './containers/Chart';
import Dashboard from './containers/Dashboard';


class App extends React.Component {
  state = { 
    navBar: false,
    signUp: false
  }

  toggleNav = () => {
    this.setState({
      navBar: !this.state.navBar
    })
  }

  toggleSignUp = () => {
    this.setState({
      signUp: !this.state.signUp
    })
  }



  render() {
    return (
      <Router>
        <Sidebar.Pushable>
          <Sidebar
          as={Menu}
          animation="overlay"
          icon="labeled"
          inverted
          onHide={() => this.toggleNav()}
          direction="top"
          visible={this.state.navBar}
          width="very thin"
          >
            <Menu.Item as={Link} to="/">
              <Icon name="home" />
              Home
            </Menu.Item>
            <Menu.Item as={Link} to="/schedule">
              <Icon name="heart outline" />
              Schedule
            </Menu.Item>
            <Menu.Item as={Link} to="/chart">
              <Icon name="chart area" />
              Chart
            </Menu.Item>
            <Menu.Item as={Link} to="/profile">
              <Icon name="user outline" />
              Profile
            </Menu.Item>
            <Menu.Item onClick={() => this.logOut()}>
              <Icon name="sign out" />
              Sign-out
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher dimmed={this.state.navBar}>
            <NavBarOpener toggle={this.toggleNav}/>  
            <Route exact path="/">
              {this.props.loggedin? <Dashboard /> : <Login toggleSignUp={this.toggleSignUp} signUp={this.state.signUp}/>}
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route exact path="/schedule">
              <Schedule />
            </Route>
            <Route exact path="/chart">
              <Chart />
            </Route> 
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Router>
    );
  }
}

const sToP = state => {
  return {loggedin: state.loggedin}
}

// const dToP = dispatch => ({
//   login: data => dispatch({ type: "LOGIN", payload:data})
// })

export default connect(sToP)(App);