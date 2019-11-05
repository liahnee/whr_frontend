import React from 'react';
import { Form, Input, Button } from 'semantic-ui-react';
import SignUp from '../componentsHome/SignUp';

const Home = props => {
    return (
        <div className='home'>
            <Form error>
                <Form.Field inline>
                    <label>DR.</label>
                    <Input placeholder='USERNAME' /> 
                </Form.Field>
                <Form.Input label='password' placeholder='PASSWORD' /> 
                {/* <Message
                    error
                    header='Action Forbidden'
                    content='You can only sign up for an account once with a given e-mail address.'
                /> */}
                <Button>Submit</Button>
            </Form>
            <Button onClick={props.toggleSignUp}>Sign Up</Button>
            <SignUp open={props.signUp} toggle={props.toggleSignUp} />
        </div>
    )
};

export default Home;