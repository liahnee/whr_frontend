import React from 'react';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';

const SignOut = props => {
    const handleClick = () => {
        localStorage.clear();
        props.logout();
    }
    return (
        <Button onClick={handleClick}>Signout</Button>
    ) 
}

const sToP = state => {
    return {loggedin: state.manageLogin.loggedin}
}

const dToP = dispatch => ({
    logout: () => dispatch({ type: "LOGOUT"})
})

export default connect(sToP, dToP)(SignOut)