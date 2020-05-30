import React from 'react';
import { Modal, Form, Header, Input, Button, Message, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const url ='https://cors-anywhere.herokuapp.com/https://immense-thicket-18399.herokuapp.com/' +  '/api/v1/';

class SignUp extends React.Component {

	signUp = async (e) => {
		// e.preventDefault();
		const { username, password, name } = this.state;
		await fetch(url + 'users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({ user: { username, password, name } })
		}).then((resp) => {
			console.log(resp);
			if (!resp.ok) {
				this.setState({
					error: true
				});
			} else {
				return resp.json(), this.signin();
			}
		});
	};

	signoff = () => {
		const { username, password } = this.state;
		fetch(url + 'login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({})
		})
			.then((resp) => resp.json())
			.then((data) => {
				console.log(data);
			})
			.then(
				this.setState({
					HPI: '',
					ROS: '',
					PE: '',
					assessment: [],
					prescription: [],
					icd_11: []
				})
			)
			.then(() => this.props.history.push('/'));
	};

	render() {
		return (
			<Modal size="small" trigger={<Button>Confirm</Button>}>
				<Modal.Header>
					{this.state.first_name} {this.state.last_name}
				</Modal.Header>
				<Modal.Content image>
					<Image wrapped size="small" src="https://react.semantic-ui.com/images/avatar/large/rachel.png" />
					<Modal.Description>
						<List divided relaxed>
							<List.Item icon="hpi" content={this.state.gender} />
							<List.Item icon="dna" content={this.state.sex} />
							<List.Item icon="birthday cake" content={this.state.age} />
							{/* <List.Item icon="times" content={this.state.allergies} />
							<List.Item icon="pills" content={this.state.drug_allergies} />
							<List.Item icon="band aid" content={this.state.past_medical_history} /> */}
							<List.Item icon="pills" content={this.state.personality} />
							<List.Item icon="pills" content={this.state.lifestyle} />
							<List.Item icon="pills" content={this.state.finance} />
						</List>
					</Modal.Description>
					{this.state.error ? (
						<Message
							className="newPatientError"
							error
							header="Action Forbidden"
							content={this.state.error_msg}
						/>
					) : null}
				</Modal.Content>
				<Modal.Actions>
					<Button onClick={this.handleSubmit}>Create</Button>
				</Modal.Actions>
			</Modal>
		);
	}
}

const sToP = (state) => {
	return { loggedin: state.manageLogin.loggedin };
};

const dToP = (dispatch) => ({
	login: (data) => dispatch({ type: 'LOGIN', payload: data })
});

export default withRouter(connect(sToP, dToP)(SignUp));
