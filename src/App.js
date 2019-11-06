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

  logged() {
    if (localStorage.token){
      const data = {user: {
        username: localStorage.username, 
        name: localStorage.name,
        id: localStorage.id
      }}
      this.props.login(data)
      return <Dashboard />
    }
    else {
      return <Redirect to='login'/>
    }
  }

  handleLogout = () => {
    this.props.toggle();
    localStorage.clear();
    this.props.logout();
    // console.log(this.props.show)
  }

  signedNav = () => {
    return (
      <React.Fragment>
        
      </React.Fragment>
    )
  }

  render() {
    return (
      <Router>
        <Sidebar.Pushable>
          {this.props.loggedin?(
          <Sidebar
          as={Menu}
          animation="overlay"
          icon="labeled"
          inverted
          onHide={() => this.props.toggle()}
          direction="top"
          visible={this.props.show}
          width="very thin"
          >
            <Menu.Item as={Link} to="/">
              <Icon name="home" />
              Home
            </Menu.Item>
            <Menu.Item as={Link} to="/schedule">
              <Icon name="calendar alternate outline" />
              Schedule
            </Menu.Item>
            <Menu.Item as={Link} to="/chart">
              <Icon name="clipboard outline" />
              Chart
            </Menu.Item>
            <Menu.Item as={Link} to="/profile">
              <Icon name="user md" />
              Profile
            </Menu.Item>
            <Menu.Item onClick={() => this.handleLogout()}>
              <Icon name="sign out" />
              Sign-out
            </Menu.Item>
          </Sidebar>
          ):( null)}
          <Sidebar.Pusher dimmed={this.props.show}>
            {/* <NavBarOpener />   */}
            <Route exact path="/">
              {this.props.loggedin? <Dashboard />:this.logged()}
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/dashboard">
              <Dashboard />
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
  return {
    loggedin: state.manageLogin.loggedin,
    show: state.manageNavBar.show
  }
}

const dToP = dispatch => ({
  login: data => dispatch({ type: "LOGIN", payload:data}),
  logout: () => dispatch({ type:"LOGOUT" }),
  toggle: () => dispatch({ type: "TOGGLE"})
})

export default connect(sToP, dToP)(App);