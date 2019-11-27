import React from 'react';
import { Form, Input, Button, Label, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import SignUp from '../componentsHome/SignUp';

const url = 'http://localhost:3000/api/v1/';

class Signin extends React.Component {

    state = {
        username: '',
        password: '',
        loggedin: false,
        error: false
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
        .then(e => {
            if (e.status !== 202) {
                this.setState({
                    error: true
                })
            }
            else {
                return e.json().then(async data => {
                    await this.props.login(data)
                    localStorage.setItem('token', data.jwt)
                    localStorage.setItem('username', data.user.username)
                    localStorage.setItem('name', data.user.name)
                    localStorage.setItem('id', data.user.id)
                })
                .then(() => this.setState({
                    username: '',
                    password: '',
                    loggedin: true
                 }))
                 .then(() => {
                     fetch(url + 'single_player_patients', {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        Authorization: 'Bearer ' + localStorage.token
                    }
                })
                    .then((resp) => resp.json())
                    .then((data) => this.props.addAllPatients(data));
                })
            }           
        })
        
    };


    toggleSignUp = (e) => {
        e.preventDefault()
        this.setState({
        signUp: !this.state.signUp
        })
    }


    render() {
        return (
            <React.Fragment>
                {this.state.loggedin? <Redirect to='/'/>: null}
                <div className="signin"> 
                    <Form error id="signinForm" onSubmit={this.handleSubmit}>
                        <Form.Field inline id="signinFirstField" >
                            <Label className="signinDr">Dr.</Label>
                            <Input transparent placeholder='   USERNAME' className="signinUsername" onChange={this.handleUsername.bind(this)}/>
                        </Form.Field>
                        <Form.Field className='signinPassword' inline > 
                            <input type='password' value={this.state.password} onChange={this.handlePassword.bind(this)}/> 
                        </Form.Field>
                        <Button basic inverted color='blue' id="signinBtn" style={{border:"none"}}> Enter </Button>
                        <Button basic inverted color='olive' id="signupBtn" onClick={(e) => this.toggleSignUp(e)}>New Account</Button>
                        {this.state.error? <Message className='loginError'
                            error
                            header='Action Forbidden'
                            content='Incorrect Username and/or Password.'
                        /> : null }
                    </Form>

                    <SignUp open={this.state.signUp} toggle={this.toggleSignUp} />
                </div>
            </React.Fragment>
        )
    }
};

const sToP = state => {
    return {loggedin: state.manageLogin.loggedin}
}

const dToP = dispatch => ({
    login: data => dispatch({ type: "LOGIN", payload:data}),
    addAllPatients: (data) => dispatch({ type: 'ADD_ALL_PATIENTS', payload: data })
})

export default withRouter(connect(sToP, dToP)(Signin));