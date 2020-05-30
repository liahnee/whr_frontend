import React from 'react';
import { Modal, Form, Header, Input, Button, Message, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const url ='https://immense-thicket-18399.herokuapp.com/' +  '/api/v1/';

class SignUp extends React.Component {

    state = {
        username: '',
        password: '',
        name: '',
        showPassword: 'password',
        passwordIcon: 'eye slash outline'
        // signUp: false
    }

    signUp = async (e) => {
        // e.preventDefault();
        const { username, password, name } = this.state;
        await fetch(url + 'users',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({user:{ username, password, name }})
        })
        .then(resp => {
            console.log(resp)
            if (!resp.ok) {
                this.setState({
                    error: true
                })
            }
            else {
                return (resp.json(), this.signin()) 
            }           
        })
        
    }

    signin = () => {
        const { username, password } = this.state;
        fetch(url + 'login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({ user: { username, password }})
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            this.props.login(data)
            localStorage.setItem('token', data.jwt)
            localStorage.setItem('username', data.user.username)
            localStorage.setItem('name', data.user.name)
            localStorage.setItem('id', data.user.id)
        })
        .then(this.setState({
            username: '',
            password: '',
            name: ''
         }))
        .then(() => this.props.history.push('/'))
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

    handleName = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    passwordInput = () => {
        return this.state.showPassword? <input /> : <input type='password' />
    }

    showPassword = () => {
        switch(this.state.showPassword){
            case 'password':
                return this.setState({
            showPassword: 'text',
            passwordIcon: 'eye'
        })
            case 'text':
                return this.setState({
                    showPassword: 'password',
                    passwordIcon: 'eye slash outline'
                })
                default:
                    return null
            }
    }

    render() {
        return (
            <Modal dimmer={true} size='mini' open={this.props.open} onClose={this.props.toggle} closeIcon id="signup">
                <Header>Sign Up</Header>
                <Modal.Content>
                    <Form error id="signup-form">
                        <Form.Field inline>
                            
                            <Input icon='user' iconPosition='left' placeholder='Username' onChange={this.handleUsername}/>
                        </Form.Field>
                        <Form.Field inline>
                            <Input icon='lock' iconPosition='left' type={this.state.showPassword} placeholder='Password' onChange={this.handlePassword}/>
                            <Icon name={this.state.passwordIcon} onClick={this.showPassword}/>
                           
                        </Form.Field>
                        <Form.Field inline>
                            <Input icon='user circle' iconPosition='left' placeholder='Display Name' onChange={this.handleName}/><br/>
                        </Form.Field>
                        {this.state.error? <Message className='loginError'
                            error
                            header='Action Forbidden'
                            content='Incorrect Username and/or Password.'
                        /> : null }
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={this.signUp}>
                        Sign Up
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

const sToP = state => {
    return {loggedin: state.manageLogin.loggedin}
}

const dToP = dispatch => ({
    login: data => dispatch({ type: "LOGIN", payload:data})
})

export default withRouter(connect(sToP, dToP)(SignUp));
///.then only first time after sign up, show the navbar s