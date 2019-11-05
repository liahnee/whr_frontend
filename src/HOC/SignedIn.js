import React from 'react'

const LoggedInHOC = (TrueComponent)=> {
    return class LoggedInHOC extends React.Component {
        loggedIn = () => {
            return localStorage.getItem('token') ? true : false;
        }
        render() {
            return this.loggedIn()?<TrueComponent {...this.props} />: null
        }
    }
}
export default LoggedInHOC