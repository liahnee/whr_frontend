import React from 'react';
// import LoggedIn from '../HOC/SignedIn';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';

const NavBarOpener = props => {
    return (
        <React.Fragment>
            <Button color='black' onClick={props.toggle} id='navBarOpener'>NavBar</Button>
        </React.Fragment>
    )
}

const sToP = state => {
    return {
        loggedin: state.manageLogin.loggedin,
        show: state.manageNavBar.show
    }
}
  
const dToP = dispatch => ({
    toggle: () => dispatch({ type: "TOGGLE"})
})

  export default connect(sToP, dToP)(NavBarOpener);
// export default LoggedIn(NavBarOpener);