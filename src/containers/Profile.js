import React from 'react';

import { connect } from 'react-redux';

import NavBarOpener from '../componentsNavBar/NavBarOpener';
import LoggedInHOC from '../HOC/SignedIn';

const Profile = () => {
    return (
        <div className="profile">
            <div className='barGrid'>
                <NavBarOpener />  
            </div>
        </div>
    )
}

const sToP = state => {
    return {loggedin: state.manageLogin.loggedin}
}

const dToP = dispatch => ({
    login: data => dispatch({ type: "LOGIN", payload:data})
})

export default connect(sToP, dToP)(LoggedInHOC(Profile));
