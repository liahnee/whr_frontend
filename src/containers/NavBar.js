import React from 'react';
import LoggedIn from '../HOC/SignedIn'

const Schedule = () => {
    return (
        <React.Fragment>
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
  
      </React.Fragment>
    )
}

export default LoggedIn(Schedule);