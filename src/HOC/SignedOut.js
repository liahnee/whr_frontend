import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const SignedOutHOC = (FalseComponent)=> {
    return class SignedOutHOC extends React.Component {
//         loggedIn = () => {
//             return localStorage.getItem('token') ? true : false;
//         }
        render() {
            console.log(this.props)
            return this.props.loggedin? <Redirect to="/dashboard"/>: <FalseComponent {...this.props} />
        }
    }
}

const sToP = state => {
    return {loggedin: state.loggedin}
}

connect(sToP)(SignedOutHOC);
export default SignedOutHOC;