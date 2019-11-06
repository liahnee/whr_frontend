import React from 'react';
import { connect } from 'react-redux';
import NavBarOpener from '../componentsNavBar/NavBarOpener';
import LoggedInHOC from '../HOC/SignedIn';

const Chart = () => {
    return (
        <React.Fragment>
            <div className="newPatientForm">
                <p>this is a chart page.
                i need: HPI, ROS, PE, A/P sections
                need chief complaint/problem 
                </p>
                <div className='barGrid'>
                    <NavBarOpener />  
                </div>
            </div>
        </React.Fragment>
    )
}
const sToP = state => {
    return {loggedin: state.manageLogin.loggedin}
}

const dToP = dispatch => ({
    login: data => dispatch({ type: "LOGIN", payload:data})
})

export default connect(sToP, dToP)(LoggedInHOC(Chart));
