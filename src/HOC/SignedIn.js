import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";

const LoggedInHOC = (TrueComponent)=> {
    return class LoggedInHOC extends React.Component {
//         loggedIn = () => {
//             return localStorage.getItem('token') ? true : false;
//         }
        render() {
            return this.props.loggedin?<TrueComponent {...this.props} />: <Redirect to="/"/>
        }
    }
}

const sToP = state => {
    console.log(state.manageLogin.loggedin)
    return {loggedin: state.manageLogin.loggedin}
}

;
// connect(sToP)
export default (LoggedInHOC);