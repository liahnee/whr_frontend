import React from 'react';
import { Input } from 'semantic-ui-react';

const Password = props => {
    return (
        <React.Fragment>
            <label className='signinPW'>password</label>
            <Input type='password' name='password' placeholder='Enter Password' className="signinPassword" value={props.value} onChange={props.onChange} />
        </React.Fragment>
    )
};

export default Password;