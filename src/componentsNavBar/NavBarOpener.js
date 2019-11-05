import React from 'react';
import LoggedIn from '../HOC/SignedIn';
import { Button } from 'semantic-ui-react'

const NavBarOpener = props => {
    return (
        <React.Fragment>
            <Button onClick={props.toggle}>NavBar</Button>
        </React.Fragment>
    )
}

export default LoggedIn(NavBarOpener);