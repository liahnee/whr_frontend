import React from 'react';
import { connect } from 'react-redux';
import NavBarOpener from '../componentsNavBar/NavBarOpener';
import LoggedInHOC from '../HOC/SignedIn';
import { Redirect } from 'react-router-dom';
import { Form, Dropdown, Checkbox, Input, Button, Modal, Image, List, Divider, Message } from 'semantic-ui-react';


class NewPatientForm extends React.Component {

    state = {
        // first_name: '',
        // last_name: '',
        // gender: '',
        // sex: '',
        // age: '',
        // allergies: [],
        // drug_allergies: [],
        // past_medical_history: [],
        // currently_pregnant: false,
        // experience_in_pregnancy: false,
        // last_menstruation: '',
        // personality: '',
        // lifestyle: '',
        // finance:'',
    };

    female = () => {
        const female = ['XX', 'XXX', 'X', 'OTHER'];

        if (female.includes(this.state.sex)){
            return (
                <React.Fragment>
                    <span> Currently Pregnant
                        <Checkbox toggle name='currently_pregnant' onChange={(e,d) => this.handleChange(e, d)}/>
                    </span><br/>
                    <span> Experience in pregnancy
                        <Checkbox toggle name='experience_in_pregnancy' onChange={(e,d) => this.handleChange(e, d)}/>
                    </span> <br/>
                    <span> Last menstruation 
                        <Input type='date' name='last_menstruation' onChange={(e,d) => this.handleChange(e, d)}/>
                    </span>
                </React.Fragment>
            )
        };
    };

    male = () => {
        const male = ['XY', 'XXY', 'XYY', 'OTHER'];
        if (male.includes(this.state.sex)) {
            this.setState({
                currently_pregnant: false,
                experience_in_pregnancy: false,
                last_menstruation: null
            })
        };
    };

    handleChange = (e, d) => {
        const key = d.name;
        const value = d.value;
        switch (key) {
            case 'first_name':
                return this.setState({
                    first_name: value
                })
            case 'last_name':
                return this.setState({
                    last_name: value
                })
            case 'gender':
                return this.setState({
                    gender: value
                })
            case 'sex':
                return (
                    this.setState({
                        sex: value
                    }, () => this.male())
                )
            case 'age':
                return this.setState({
                    age: Number.parseInt(value)
                })
            case 'allergies':
                return this.setState({
                    allergies: value
                })
            case 'drug_allergies':
                return this.setState({
                    drug_allergies: value
                })
            case 'past_medical_history':
                return this.setState({
                    past_medical_history: value
                })
            case 'currently_pregnant':
                return this.setState({
                    currently_pregnant: d.checked
                })
            case 'experience_in_pregnancy':
                return this.setState({
                    experience_in_pregnancy: d.checked
                })
            case 'last_menstruation':
                return this.setState({
                    last_menstruation: value
                })
            case 'personality':
                return this.setState({
                    personality: value
                })
            case 'lifestyle':
                return this.setState({
                    lifestyle: value
                })
            case 'finance':
                return this.setState({
                    finance: value
                })
            default:
                return null;
        };
    };

    handleSubmit = (e) => {
        e.preventDefault()
        const user_id = this.props.id;
        const { first_name, last_name, gender, sex, age, allergies, drug_allergies, past_medical_history, currently_pregnant, experience_in_pregnancy, last_menstruation, personality, lifestyle, finance } = this.state;
        fetch('http://localhost:3000/api/v1/single_player_patients',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': 'Bearer ' + localStorage.token
            },
            body: JSON.stringify( { single_player_patient: { first_name, last_name, gender, sex, age, currently_pregnant, experience_in_pregnancy, last_menstruation, personality, lifestyle, finance, user_id } })
        })
        .then(resp => {
            console.log(resp)
            if (!resp.ok) {
                this.setState({
                    error: true,
                    error_msg: resp.json()
                })
            }
            else {
                return resp.json()
            }           
        }).then( () => {
            return <Redirect to='/' />
        })
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

        const tempAllergies = [
            { key: 'dairy', text: 'Dairy', value: 'dairy' },
            { key: 'sun', text: 'Sun', value: 'sun' },
            { key: 'nuts', text: 'Nuts', value: 'nuts' }
        ]

        const tempMedical = [
            { key: 'asthma', text: 'asthma', value: 'asthma' },
            { key: 'diabetes', text: 'diabetes', value: 'diabetes' },
            { key: 'seizures', text: 'seizures', value: 'seizures' }
        ]

        const tempDrug = [
            { key: 'penicillin', text: 'penicillin', value: 'penicillin' },
            { key: 'sulfa dugs', text: 'sulfa dugs', value: 'sulfa dugs' },
            { key: 'amoxicillin', text: 'amoxicillin', value: 'amoxicillin' }
        ]

        const personality = [
            { key: 'cooperative', text: 'cooperative', value: 'cooperative' },
            { key: 'moderate', text: 'moderately cooperative', value: 'moderately_cooperative' },
            { key: 'non-cooperative', text: 'non-cooperative', value: 'non-cooperative' }
        ]

        const lifestyle = [
            { key: 'busy', text: 'busy', value: 'busy' },
            { key: 'irregular', text: 'irregular', value: 'irregular' },
            { key: 'balanced', text: 'balanced', value: 'balanced' },
            { key: 'flexible', text: 'flexible', value: 'flexible' }
        ]

        const finance = [
            { key: 'poor', text: 'poor', value: 'poor' },
            { key: 'okay', text: 'okay', value: 'okay' },
            { key: 'good', text: 'good', value: 'good' }
        ]

        return (
            <React.Fragment>
                <div className="newPatientForm">
                    <div className='newPatientFormSection'>
                        <Form error onSubmit={this.handleSubmit}>
                            <Form.Group widths='equal'>
                                <Form.Input fluid name='first_name' label='First name' placeholder='First name' onChange={(e,d) => this.handleChange(e, d)}/>
                                <Form.Input fluid name='last_name' label='Last name' placeholder='Last name' onChange={(e,d) => this.handleChange(e, d)}/>
                                <Form.Select
                                    fluid
                                    name='gender'
                                    label='Gender'
                                    options={gender}
                                    placeholder='Gender'
                                    onChange={(e,d) => this.handleChange(e, d)}
                                />
                                <Form.Select onChange={this.female()}
                                    fluid
                                    name='sex'
                                    label='Sex'
                                    options={sex}
                                    placeholder='Sex'
                                    onChange={(e,d) => this.handleChange(e, d)}
                                />     
                                <Form.Input fluid name='age' label='Age' placeholder='Age' onChange={(e,d) => this.handleChange(e, d)}/>                     
                            </Form.Group>
                            <div className='femaleDiv'>
                                {this.female()}
                            </div>
                            <span> Allergies 
                                <Dropdown
                                    name='allergies'
                                    placeholder='Allergies'
                                    fluid
                                    multiple
                                    search
                                    selection
                                    options={tempAllergies}
                                    onChange={(e,d) => this.handleChange(e, d)}
                                />
                            </span>
                            <span> Drug Allergies
                                <Dropdown
                                    name='drug_allergies'
                                    placeholder='Drug Allergies'
                                    fluid
                                    multiple
                                    search
                                    selection
                                    options={tempDrug}
                                    onChange={(e,d) => this.handleChange(e, d)}
                                />
                            </span>
                            <span> Past Medical History 
                                <Dropdown
                                    name='past_medical_history'
                                    placeholder='Past Medical History'
                                    fluid
                                    multiple
                                    search
                                    selection
                                    options={tempMedical}
                                    onChange={(e,d) => this.handleChange(e, d)}
                                />
                            </span>
                            <Divider/>
                            <span> Personality
                                <Dropdown
                                    name='personality'
                                    fluid
                                    selection
                                    simple
                                    item
                                    options={personality}
                                    onChange={(e,d) => this.handleChange(e, d)}
                                />
                            </span>
                            <span> Lifestyle
                                <Dropdown
                                    name='lifestyle'
                                    fluid
                                    selection
                                    simple
                                    item
                                    options={lifestyle}
                                    onChange={(e,d) => this.handleChange(e, d)}
                                />
                            </span>
                            <span> Finance
                                <Dropdown
                                    name='finance'
                                    fluid
                                    selection
                                    simple
                                    item
                                    options={finance}
                                    onChange={(e,d) => this.handleChange(e, d)}
                                />
                            </span>
                            
                        </Form> 
                        <Modal size='small' trigger={<Button>Confirm</Button>}>
                            <Modal.Header>{this.state.first_name} {this.state.last_name}</Modal.Header>
                            <Modal.Content image>
                                <Image wrapped size='small' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' />
                                <Modal.Description>
                                    <List divided relaxed>
                                        <List.Item icon='genderless' content={this.state.gender} />
                                        <List.Item icon='dna' content={this.state.sex} />
                                        <List.Item icon='birthday cake' content={this.state.age} />
                                        <List.Item icon='times' content={this.state.allergies} />
                                        <List.Item icon='pills' content={this.state.drug_allergies} />
                                        <List.Item icon='band aid' content={this.state.past_medical_history} />
                                        <List.Item icon='pills' content={this.state.personality} />
                                        <List.Item icon='pills' content={this.state.lifestyle} />
                                        <List.Item icon='pills' content={this.state.finance} />
                                    </List>
                                </Modal.Description>
                                {this.state.error? <Message className='newPatientError'
                                    error
                                    header='Action Forbidden'
                                    content='Must fill in all forms.'
                                /> : null }
                            </Modal.Content>
                            <Modal.Actions>
                                <Button onClick={this.handleSubmit}>Create</Button>
                            </Modal.Actions>
                        </Modal>
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
    return {loggedin: state.manageLogin.loggedin, id: state.manageLogin.id}
}

const dToP = dispatch => ({
    login: data => dispatch({ type: "LOGIN", payload:data})
})

export default connect(sToP, dToP)(LoggedInHOC(NewPatientForm));
