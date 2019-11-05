import React from 'react';
import { Form, Input, Button, Label } from 'semantic-ui-react';
import { connect } from 'react-redux';
import SignedOutHOC from '../HOC/SignedOut';
import { Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login';

class Home extends React.Component {


    render() {
        return (
            <React.Fragment>
                {this.props.loggedin?<Dashboard />:<Login toggleSignUp={this.toggleSignUp}signUp={this.state.signUp} /> }
            </React.Fragment>
        )
    }
};

const sToP = state => {
    return {loggedin: state.loggedin}
}

const dToP = dispatch => ({
    login: data => dispatch({ type: "LOGIN", payload:data})
})

export default connect(sToP, dToP)(Home);