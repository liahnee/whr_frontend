import React from 'react';
import './App.css';
import { Menu, Sidebar } from "semantic-ui-react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from './containers/Home';
import SignUp from './componentsHome/SignUp';
import NavBarOpener from './componentsNavBar/NavBarOpener';

function App() {

  // fetch()
  // .then( data => {
  //   localStorage.setItem('token', data.jwt)
  // })
  toggleNav = () => {
    //redux dispatch
  }

  return (
    <Router>
      <Sidebar.Pushable>
        <Sidebar
          as={Menu}
          animation="overlay"
          icon="labeled"
          inverted
          onHide={() => this.toggleNav()}
          vertical
          visible={this.state.navBarShow}
          width="thin"
        >
          <NavBar />
        </Sidebar>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path ="/signup">
            <SignUp />
          </Route>
        <Sidebar.Pusher dimmed={this.state.navBarShow}>
          <NavBarOpener toggle={this.toggleNav}/>  
          {/* <Route exact path="/profile">
            <Profile />
          </Route>
          <Route exact path="/schedule">
            <Schedule />
          </Route>
          <Route exact path="/chart">
            <Chart />
          </Route> */}
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </Router>
  );
}

export default App;