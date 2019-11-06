import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import NavBarOpener from '../componentsNavBar/NavBarOpener';
import LoggedInHOC from '../HOC/SignedIn';
import { Form, Dropdown, Checkbox, Button } from 'semantic-ui-react';
import Calendar from 'react-input-calendar'


class NewPatientForm extends React.Component {

    state = {
        first_name: '',
        last_name: '',
        gender: '',
        sex: '',
        age: '',
        allergies: [],
        past_medical_history: []
    }

    currentDate = () => {
        const today = new Date()
        return `${today.getDate()}-${today.getMonth()}-${today.getFullYear()}`
    }

    female = () => {
        const female = ['XX', 'XXX', 'X', 'OTHER']

        if (female.includes(this.state.sex)){
            const node = ReactDOM.findDOMNode(this);
            if (node instanceof HTMLElement) {
                const child = node.querySelector('.femaleDiv');
                node.append(
                    <React.Fragment>
                        <span> Currently Pregnant
                            <Checkbox toggle/>
                        </span>
                        <span> Experience in pregnancy
                            <Checkbox toggle/>
                        </span> 
                        <span> Last menstruation 
                            <Calendar format='DD/MM/YYYY' date={this.currentDate()} />
                        </span>
                    </React.Fragment>
                )
            }
        }
    };

    handleChange = (e) => {
        console.log(e)
        // find key and value to setstate
    }

    render() {
        const gender = [
            { key: 'm', text: 'Male', value: 'male' },
            { key: 'f', text: 'Female', value: 'female' },
            { key: 'o', text: 'Other', value: 'other' }
        ]
        const sex = [
            { key: 'xy', text: 'XY', value: 'XY' },
            { key: 'xx', text: 'XX', value: 'XX' },
            { key: 'xxx', text: 'XXX', value: 'XXX' },
            { key: 'x', text: 'X', value: 'X' },
            { key: 'xxy', text: 'XXY', value: 'XXY' },
            { key: 'xyy', text: 'XYY', value: 'XYY' },
            { key: 'o', text: 'OTHER', value: 'OTHER' }
        ]

        const tempAllergies =[
            { key: 'm', text: 'Dairy', value: 'dairy' },
            { key: 'f', text: 'Sun', value: 'sun' },
            { key: 'o', text: 'Nuts', value: 'nuts' }
        ]
        return (
            <React.Fragment>
                <div className="newPatientForm">
                    <div className='newPatientFormSection'>
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Input fluid key='first_name' label='First name' placeholder='First name' onChange={this.handleChange}/>
                                <Form.Input fluid key='last_name' label='Last name' placeholder='Last name' />
                                <Form.Select
                                    fluid
                                    label='Gender'
                                    options={gender}
                                    placeholder='Gender'
                                />
                                <Form.Select onChange={this.female()}
                                    fluid
                                    label='Sex'
                                    options={sex}
                                    placeholder='Sex'
                                />                          
                            </Form.Group>
                            <div className='femaleDiv'></div>
                            <span> Allergies 
                                <Dropdown
                                    placeholder='Allergies'
                                    fluid
                                    multiple
                                    search
                                    selection
                                    options={tempAllergies}
                                />
                            </span>
                            <span> Past Medical History 
                                <Dropdown
                                    placeholder='Past Medical History'
                                    fluid
                                    multiple
                                    search
                                    selection
                                    options={tempAllergies}
                                />
                            </span>
                            
                        </Form> 
                    </div>
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

export default connect(sToP, dToP)(LoggedInHOC(NewPatientForm));
