import React from 'react';
import { Form, Input, Button, Label } from 'semantic-ui-react';
import { connect } from 'react-redux';

import SignUp from '../componentsHome/SignUp';
import Password from '../componentsHome/PasswordInput';
import SignedOutHOC from '../HOC/SignedOut';

class Signin extends React.Component {

    state = {
        username: '',
        password: '',
        passwordHidden:true
    }

    handleUsername = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    handlePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const { username, password } = this.state;
        await fetch('http://localhost:3000/api/v1/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({ user: { username, password }})
        })
        .catch((e) => {console.log(e)})
        .then(resp => resp.json())
        .then(data => {
            // console.log(data)
            this.props.login(data)
            localStorage.setItem('token', data.jwt)
        })
        .then(() => this.setState({
            username: '',
            password: ''
         }));
         this.props.history.push("/")
    }

    render() {
        return (
            <React.Fragment>
                <div className="signin"> 
                    <Form error id="signinForm" onSubmit={this.handleSubmit}>
                        <Form.Field inline id="signinFirstField" >
                            <Label className="signinDr">DR.</Label>
                            <Input transparent placeholder='USERNAME' className="signinUsername" onChange={this.handleUsername.bind(this)}/>
                        </Form.Field>
                        <Form.Field inline >
                            <Password value={this.state.password} onChange={this.handlePassword.bind(this)}/> 
                        </Form.Field>
                        {/* <Message
                            error
                            header='Action Forbidden'
                            content='You can only sign up for an account once with a given e-mail address.'
                        /> */}
                        <Button id="signinBtn">Submit</Button>
                    </Form>
                    <Button id="signupBtn" onClick={this.props.toggleSignUp}>Sign Up</Button>
                    <SignUp open={this.props.signUp} toggle={this.props.toggleSignUp} />
                </div>
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

export default SignedOutHOC(connect(sToP, dToP)(Signin));