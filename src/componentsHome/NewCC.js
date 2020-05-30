import React from 'react';

import { Modal, Form, Header, Input, Button, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';

const url ='https://cors-anywhere.herokuapp.com/https://immense-thicket-18399.herokuapp.com/' +  '/api/v1/';

class NewCC extends React.Component {
	state = {};

	postCC = () => {
		const { chief_complaint } = this.state;
		const single_player_patient = this.props.patient.id;
		const recovery_rate = 0
		fetch(url + 'sp_chief_complaints', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: 'Bearer ' + localStorage.token
			},
			body: JSON.stringify({ sp_chief_complaint: { chief_complaint, single_player_patient, recovery_rate } })
		})
    .then(() => {
      this.props.toggle();
      this.props.fetch();
    });
	};

	handleCC = (e) => {
		this.setState({
			chief_complaint: e.target.value,
			single_player_patient_id: this.props.patient_id
		});
	};

	render() {
		return (
			<Modal dimmer={true} size="small" open={this.props.open} onClose={this.props.toggle} closeIcon id="signup">
				
				<Modal.Content>
					<Form error>
						<Form.Field inline>
							<label>Chief Complaint:</label>
							<Input id="cc" placeholder="chief complaint" onChange={this.handleCC} />
						</Form.Field>
						{this.state.error ? (
							<Message
								className="Chief Complaint Error"
								error
								header="Action Forbidden"
								content="Incorrect Format"
							/>
						) : null}
					</Form>
					<Button id='newCC-confirm-btn' onClick={this.postCC}>Confirm</Button>
				</Modal.Content>
			</Modal>
		);
	}
}

const sToP = (state) => {
	return { 
		loggedin: state.manageLogin.loggedin,
		patient: state.manageCC.patient
	};
};

const dToP = (dispatch) => ({
	login: (data) => dispatch({ type: 'LOGIN', payload: data })
});

export default connect(sToP, dToP)(NewCC);