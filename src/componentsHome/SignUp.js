import React from 'react';
import { Modal, Form, Header, Input, Button } from 'semantic-ui-react';

class SignUp extends React.Component {

    state = {
        username: '',
        password: '',
        name: ''
    }

    signUp = async (e) => {
        e.preventDefault();
        const { username, password, name } = this.state;
        await fetch('http://localhost:3000/users',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({ username, password, name })
        })
    }

    handleNameChange = (e) => {
        console.log(e)
        console.log(e.target.value)
        console.log(e.target.id)
        // this.setState({
        //     username: 
        // })
    }

    render() {
        return (
            <Modal size='small' open={this.props.open} onClose={this.props.toggle} closeIcon>
                <Header>Sign Up</Header>
                <Modal.Content>
                    <Form loading error>
                        <Form.Field inline>
                            <label>Username:</label>
                            <Input placeholder='username'/>
                        </Form.Field>
                        <Form.Field inline>
                            <label>Password:</label>
                            <Input placeholder='password'/>
                        </Form.Field>
                        <Form.Field inline>
                            <label>Name:</label>
                            <Input placeholder='name'/>
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

export default SignUp
///.then only first time after sign up, show the navbar s