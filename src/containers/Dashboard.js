import React from 'react';
// import { Form, Input, Button, Label } from 'semantic-ui-react';
import { connect } from 'react-redux';

class Home extends React.Component {


    render() {
        return (
            <React.Fragment>
                <div className="dashboard"> 
                    <li>List of patients: click => render current problem </li>
                    <li>problem:click => list of charts: click => chart preview</li>
                    <li>commenting or making an action on chart can be done on 'charts' page</li>
                </div>
            </React.Fragment>
        )
    }
};

const sToP = state => {
    return {loggedin: state.loggedin}
}

const dToP = dispatch => ({
    login: data => dispatch({ type: "LOGIN", payload:data})
})

export default connect(sToP, dToP)(Home);