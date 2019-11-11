import React from 'react';
import { connect } from 'react-redux';
import NavBarOpener from '../componentsNavBar/NavBarOpener';
import LoggedInHOC from '../HOC/SignedIn';
import { Form, Container, Dropdown, Button, Card, Message, Image } from 'semantic-ui-react';

class Chart extends React.Component {

    state = {
        HPI: '',
        ROS: '',
        PE: '',
        assessment: [],
        prescription: []

    };

    handleChange = (e, d) => {
        const key = d.name;
        const value = d.value;
        switch (key) {
            case 'assessment':
                return this.setState({
                    assessment: value
                })
            case 'prescription':
                return this.setState({
                    prescription: value
                })
            case 'HPI':
                return this.setState({
                    HPI: value
                })
            case 'ROS':
                return this.setState({
                    ROS: value
                })
            case 'PE':
                return this.setState({
                    PE: value
                })
            default:
                return null;
        }
    };

    handleSubmit = (e) => {
        e.preventDefault()
    }

    render() {

        const tempMedical =[
            { key: 'asthma', text: 'asthma', value: 'asthma' },
            { key: 'diabetes', text: 'diabetes', value: 'diabetes' },
            { key: 'seizures', text: 'seizures', value: 'seizures' }
        ]

        const tempDrug =[
            { key: 'penicillin', text: 'penicillin', value: 'penicillin' },
            { key: 'sulfa dugs', text: 'sulfa dugs', value: 'sulfa dugs' },
            { key: 'amoxicillin', text: 'amoxicillin', value: 'amoxicillin' }
        ]

        return (
            <React.Fragment>
                <div className="chart">
                    <span>
                        <Card
                            color='teal'
                            // image=
                            // header='Elliot Baker'
                            // meta='Friend'
                            // description=''
                            // extra={extra}
                        >
                            <Image src='https://react.semantic-ui.com/images/avatar/large/molly.png'/>
                            <Card.Content>
                                <Card.Header>Steve Sanders</Card.Header>
                                <Card.Meta>Chief Complaint</Card.Meta>
                                <Message 
                                    error
                                    header="sulfa drugs"
                                    // content=""
                                /> 
                            </Card.Content>
                        </Card>
                        <Form onSubmit={this.handleSubmit} className='chartgrid'>
                            <Form.Group className='HPI'>
                                <Form.TextArea label='HPI' placeholder='' onChange={(e,d) => this.handleChange(e, d)}/>
                            </Form.Group>
                            <Form.Group className='ROS'>
                                <Form.TextArea label='ROS' placeholder='' onChange={(e,d) => this.handleChange(e, d)}/>
                            </Form.Group>
                            <Form.Group className='PE'>
                                <Form.TextArea label='PE' placeholder='' onChange={(e,d) => this.handleChange(e, d)}/>
                            </Form.Group>
                            <Form.Group grouped className='AP'>
                                {/* <Form.Field> */}
                                <label>Diagnosis</label>
                                <Dropdown
                                    name='assessment'
                                    placeholder='Diagnosis'
                                    fluid
                                    multiple
                                    search
                                    selection
                                    options={tempMedical}
                                    onChange={(e,d) => this.handleChange(e, d)}
                                />
                                <label>Prescription</label>
                                <Dropdown
                                    name='prescription'
                                    placeholder='Rx'
                                    fluid
                                    multiple
                                    search
                                    selection
                                    options={tempDrug}
                                    onChange={(e,d) => this.handleChange(e, d)}
                                />
                                {/* </Form.Field> */}
                            </Form.Group>
                            <Button className='signoff'>Sign off</Button>
                        </Form>
                    </span>
                    <div className='barGrid'>
                        <NavBarOpener />  
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
const sToP = state => {
    return {loggedin: state.manageLogin.loggedin}
}

const dToP = dispatch => ({
    login: data => dispatch({ type: "LOGIN", payload:data})
})

export default connect(sToP, dToP)(LoggedInHOC(Chart));
