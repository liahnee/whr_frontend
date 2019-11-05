import React from 'react';
import { Modal, Form, Header, Input, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';

class SignUp extends React.Component {

    state = {
        username: '',
        password: '',
        name: ''
    }

    signUp = async (e) => {
        // e.preventDefault();
        const { username, password, name } = this.state;
        await fetch('http://localhost:3000/api/v1/users',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({user:{ username, password, name }})
        })
        .then(resp => resp.json())
        .then(data => console.log(data))
        .then(() => this.signin())   
    }

    signin = () => {
        const { username, password } = this.state;
        fetch('http://localhost:3000/api/v1/login', {
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
        })
        .then(this.setState({
            username: '',
            password: '',
            name: ''
         }))
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

    render() {
        return (
            <Modal dimmer={true} size='small' open={this.props.open} onClose={this.props.toggle} closeIcon id="signup">
                <Header>Sign Up</Header>
                <Modal.Content>
                    <Form error>
                        <Form.Field inline>
                            <label>Username:</label>
                            <Input placeholder='username' onChange={this.handleUsername}/>
                        </Form.Field>
                        <Form.Field inline>
                            <label>Password:</label>
                            <Input placeholder='password' onChange={this.handlePassword}/>
                        </Form.Field>
                        <Form.Field inline>
                            <label>Name:</label>
                            <Input placeholder='name' onChange={this.handleName}/><br/>
                        </Form.Field>
                        {/* <Message error
                            header='Action Forbidden'
                            content=
                        /> */}
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
    return {loggedin: state.loggedin}
}

const dToP = dispatch => ({
    login: data => dispatch({ type: "LOGIN", payload:data})
})

export default connect(sToP, dToP)(SignUp)
///.then only first time after sign up, show the navbar s