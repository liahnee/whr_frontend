import React from 'react'

const LoggedInHOC = (TrueComponent, FalseComponent)=> {
    return class LoggedInHOC extends React.Component {
        loggedIn = () => {
            return localStorage.getItem('token') ? true : false;// this ternary can be whichever method you choose to verify login
        }
        render() {
            return this.loggedIn()?<TrueComponent {...this.props} />: 'Cannot access without authentification.' 
        }
    }
}
export default LoggedInHOC