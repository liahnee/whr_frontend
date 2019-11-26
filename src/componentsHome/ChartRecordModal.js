import React from 'react';
import LoggedInHOC from '../HOC/SignedIn';
import { Modal, Form, Header, Input, Button, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import '../home.css'

class ChartRecordModal extends React.Component {

	render() {
		return (
			// <Modal dimmer={true} size="small" open={this.props.open} onClose={this.props.close} closeIcon id="signup">
			// 	<Header />
			// 	<Modal.Content>
			// 		<Form error>
			// 			<Form.Field inline>
			// 				<label>Chief Complaint:</label>
			// 				<Input id="cc" placeholder="chief complaint" onChange={this.handleCC} />
			// 			</Form.Field>
			// 			{this.state.error ? (
			// 				<Message
			// 					className="Chief Complaint Error"
			// 					error
			// 					header="Action Forbidden"
			// 					content="Incorrect Format"
			// 				/>
			// 			) : null}
			// 		</Form>
			// 	</Modal.Content>
			// 	<Modal.Actions>
			// 		<Button onClick={this.postCC}>Confirm</Button>
			// 	</Modal.Actions>
			// </Modal>
		null
			);
	}
}

const sToP = (state) => {
	return { 
		open: state.manageCharts.openRecord,
	};
};

const dToP = (dispatch) => ({
	close: () => dispatch({type: 'CLOSE'})
});

export default connect(sToP, dToP)(LoggedInHOC(ChartRecordModal));