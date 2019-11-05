import React from 'react';
import { } from 'semantic-ui-react';
import SignUp from '../componentsHome/SignUp';

const Home = () => {
    return (
        <div className='home'>
            <Form error>
                <Form.Input label='DR.' placeholder='USERNAME' /> 
                <Form.Input placeholder='PASSWORD' /> 
                <Message
                    error
                    header='Action Forbidden'
                    content='You can only sign up for an account once with a given e-mail address.'
                />
                <Button>Submit</Button>
            </Form>
            <SignUp />
        </div>
    )
};

export default Home;