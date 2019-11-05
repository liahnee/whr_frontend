import React from 'react';
import './App.css';
import { Menu, Sidebar } from "semantic-ui-react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from './containers/Home';
import NavBarOpener from './componentsNavBar/NavBarOpener';
import NavBar from './containers/NavBar';

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
          <Route exact path="/">
            <Home toggleSignUp={this.toggleSignUp} signUp={this.state.signUp}/>
          </Route>
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
            <NavBar />
          </Sidebar>
          <Sidebar.Pusher dimmed={this.state.navBar}>
            <NavBarOpener toggle={this.toggleNav}/>  
             {/* <Route exact path="/profile">
               <Profile />
             </Route>
             <Route exact path="/schedule">
               <Schedule />
             </Route>
             <Route exact path="/chart">
               <Chart />
             </Route>  */}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Router>
    );
  }
}

export default (App);