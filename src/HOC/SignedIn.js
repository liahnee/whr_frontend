import React from 'react';
import { Redirect } from "react-router-dom";

const LoggedInHOC = (TrueComponent)=> {
    return class LoggedInHOC extends React.Component {
        render() {
            return this.props.loggedin?<TrueComponent {...this.props} />: <Redirect to="/"/>
        }
    }
}

export default LoggedInHOC;