import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
// import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import dashboardBg from '../assets/pill1.02.jpg'
import stethoscopeBG from '../assets/pill1.11.jpg';
import examRoomBG from '../assets/pill1.21.jpg';
import boardBG from '../assets/pill1.31.jpg';
import NavBarOpener from '../componentsNavBar/NavBarOpener';

class Home extends React.Component {

    handleExit = () => {
        const node = ReactDOM.findDOMNode(this);
       node.style.backgroundImage = `url(${dashboardBg})`

    }

    handlePatientList = () => {
        const node = ReactDOM.findDOMNode(this);
        node.style.backgroundImage = `url(${stethoscopeBG})`
    }
    handleExamRoom = () => {
        const node = ReactDOM.findDOMNode(this);
        node.style.backgroundImage = `url(${examRoomBG})`
    }
    handleBoard = () => {
        const node = ReactDOM.findDOMNode(this);
        node.style.backgroundImage = `url(${boardBG})`
    }

    render() {
        return (
            <React.Fragment>
                <div className="dashboard"> 
                    <li>List of patients: click => render current problem </li>
                    <li>problem:click => list of charts: click => chart preview</li>
                    <li>commenting or making an action on chart can be done on 'charts' page</li>

                    <button id='patientList' onMouseEnter={this.handlePatientList} onMouseLeave={this.handleExit} />
                    <Link to='/chart'>
                        <button id='examRoom' onMouseEnter={this.handleExamRoom} onMouseLeave={this.handleExit} />
                    </Link>
                    <button id='board' onMouseEnter={this.handleBoard} onMouseLeave={this.handleExit} />
                    {/* <Button circular icon basic color='blue' inverted className='stethoscope' onMouseEnter={this.handleStethoscope} onMouseLeave={this.handleExit}>
                        <Icon size='huge' name='stethoscope' />
                    </Button>
                    <Button circular icon basic color='teal' inverted>
                        <Icon size='huge' name='user md' />
                    </Button>
                    <Button circular icon basic color='teal' inverted>
                        <Icon size='huge' name='hospital outline' />
                    </Button> */}
                    <NavBarOpener />  
                </div>
            </React.Fragment>
        )
    }
};

const sToP = state => {
    return {loggedin: state.manageLogin.loggedin}
}

const dToP = dispatch => ({
    login: data => dispatch({ type: "LOGIN", payload:data})
})

export default connect(sToP, dToP)(Home);