import React from 'react';
import { Modal, Form, Header, Input, Button, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class SignUp extends React.Component {

    state = {
    }

    postCC = () => {
      console.log(this.state.chief_complaint)
        const { chief_complaint } = this.state;
        const single_player_patient = this.props.patient.id;
        fetch('http://localhost:3000/api/v1/sp_chief_complaints', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': 'Bearer ' + localStorage.token
            },
            body: JSON.stringify({ sp_chief_complaint: { chief_complaint, single_player_patient }})
        })
        .then(resp => resp.json())
        .then(data =>{ console.log(data); this.props.toggle(); 
          this.props.fetch()
        })
        // .then(this.setState({
        //     chief_complaint: '',
        //     single_player_patient_id: ''
        //  }))
    }

    handleCC = (e) => {
        this.setState({
            chief_complaint: e.target.value,
            single_player_patient_id: this.props.patient_id
        })
    }

    render() {
        return (
            <Modal dimmer={true} size='small' open={this.props.open} onClose={this.props.toggle} closeIcon id="signup">
                <Header></Header>
                <Modal.Content>
                    <Form error>
                        <Form.Field inline>
                            <label>Chief Complaint:</label>
                            <Input placeholder='cc' onChange={this.handleCC}/>
                        </Form.Field>
                        {this.state.error? <Message className='Chief Complaint Error'
                            error
                            header='Action Forbidden'
                            content='Incorrect Format'
                        /> : null }
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={this.postCC}>
                        Confirm
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

const sToP = state => {
    return {loggedin: state.manageLogin.loggedin}
}

const dToP = dispatch => ({
    login: data => dispatch({ type: "LOGIN", payload:data})
})

export default withRouter(connect(sToP, dToP)(SignUp));
///.then only first time after sign up, show the navbar s