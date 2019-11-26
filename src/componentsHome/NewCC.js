import React from 'react';
import { Modal, Form, Header, Input, Button, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import '../home.css'

class NewCC extends React.Component {
	state = {};

	postCC = () => {
		const { chief_complaint } = this.state;
		const single_player_patient = this.props.patient.id;
		const recovery_rate = 0
		fetch('http://localhost:3000/api/v1/sp_chief_complaints', {
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
				<Header />
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
				</Modal.Content>
				<Modal.Actions>
					<Button onClick={this.postCC}>Confirm</Button>
				</Modal.Actions>
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