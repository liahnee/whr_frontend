import React from 'react';
import { connect } from 'react-redux';
import NavBarOpener from '../componentsNavBar/NavBarOpener';
import LoggedInHOC from '../HOC/SignedIn';
import { Form, Dropdown, Button, Card, Popup, Image, Icon, Input, List } from 'semantic-ui-react';
import '../chart.css';
// import { defaultCipherList } from 'constants';
// import { thisExpression } from '@babel/types';

const url = 'http://localhost:3000/api/v1/';

const renderFetch = (data) => {
	console.log('data.response', data.response.destinationEntities);
	const newData = [];
	data.response.destinationEntities.map((data) => {
		let text = data.title;
		if (data.title.includes('<em')) {
			text = text.replace("<em class='found'>", '');
			text = text.replace('</em>', '');
		}
		let value = { title: text, id: data.id };
		const { id } = data;
		const key = data.id;
		if (data.title.includes('<em')) {
			text = text.replace("<em class='found'>", '');
			text = text.replace('</em>', '');
		}
		newData.push({ text, value, id, key });
		return data;
	});
	return newData;
};

class Chart extends React.Component {
	state = {
		HPI: '',
		ROS: '',
		PE: '',
		assessment: [],
		prescription: [],
		icd_11: [],
		keywords: [] //// this needs to be fixed. separate dropdown? or customized dropdown.
	};

	componentDidMount() {}

	findValue = (d) => {
		const value = d.value;
		const options = d.options;
		let added = [];
		value.map((each) => added.push(options.filter((option) => option.value === each)));
		return added;
	};

	handleChange = (e, d) => {
		console.log('handleChange d', d);
		const key = d.name;
		const value = d.value;
		switch (key) {
			case 'assessment':
				return this.setState({
					assessment: [...this.state.assessment, value]
				});
			case 'prescription':
				return this.setState({
					prescription: [ ...this.state.prescription, value ]
				});
			case 'HPI':
				return this.setState({
					HPI: value
				});
			case 'ROS':
				return this.setState({
					ROS: value
				});
			case 'PE':
				return this.setState({
					PE: value
				});
			default:
				return null;
		}
	};

	handleSearch = async (e, d) => {
		await this.setState({
			keyword: d.value
		});
	};

	searchICD11 = async () => {
		const { keyword } = this.state;

		if (this.state.result) {
			const { result } = this.state;
			fetch(url + 'icd_11', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: 'Bearer ' + localStorage.token
				},
				body: JSON.stringify({ keyword, result })
			})
				.then((resp) => resp.json())
				.then((data) => {
					console.log('post fetch, in .then data:', data);
					const mapped = renderFetch(data);
					this.setState({
						icd_11: mapped
					});
				});
		} else {
			const result = await fetch(url + 'icd_11').then((resp) => resp.json());
			fetch(url + 'icd_11', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: 'Bearer ' + localStorage.token
				},
				body: JSON.stringify({ keyword, result })
			})
				.then((resp) => resp.json())
				.then((data) => {
					console.log('post fetch, in .then data:', data);
					const mapped = renderFetch(data);
					this.setState({
						icd_11: mapped,
						result: result
					});
				});
		}
	};

	// diagnosisOptions = () => {
	// 	// this.state.assessment
	// 	const options = this.state.assessment.concat(this.state.icd_11);
	// 	return options;
  // };
  
  deleteList = (a) => {
    this.setState({
      assessment: this.state.assessment.filter(each => each !== a )
    })
  }

	assessmentList = () => {
		return (
			<List celled horizontal>
				{this.state.assessment.map((a) => {
					return <List.Item> <List.Icon name='times' onClick={() => this.deleteList(a)}/><span><List.Content>{a.title} </List.Content></span></List.Item>;
				})}
			</List>
		);
	};

	handleSubmit = (e) => {
		e.preventDefault();
		// const { hpi, ros, pe } = this.state;
		// fetch(url + 'icd_11', {
		//   method: 'POST',
		//   headers: {
		//     'content-type': 'application/json',
		//     accept: 'application/json',
		//     Authorization: 'Bearer ' + localStorage.token
		//   },
		//   body: JSON.stringify({ hpi, ros, pe })
		// })
		// .then(resp => resp.json)
		// .then(data => {
		//   const icd_11_id = data;
		//   fetch(url + 'sp_charts', {
		//     method: 'POST',
		//     headers: {
		//       'content-type': 'application/json',
		//       accept: 'application/json',
		//       Authorization: 'Bearer ' + localStorage.token
		//     },
		//     body: JSON.stringify({ hpi, ros, pe, icd_11_id })
		//   })
		//   .then(resp => resp.json())
		//   .then(data => console.log(data))
		//   // .then(() => this.props.checkout, this.props.roomPatient(this.props.scheduled[0]))
		// })
	};

	gender = (gender) => {
		switch (gender) {
			case 'female':
				return 'avatar/large/jenny.jpg';
			case 'male':
				return 'avatar/large/christian.jpg';
			case 'other':
				return 'avatar/large/stevie.jpg';
			default:
				return 'wireframe/image.png';
		}
	};

	ccEmpty = (data) => {
		if (this.props.patient === false) {
			return '';
		} else {
			return this.props.patient[`${data}`];
		}
	};

	ptEmpty = (data) => {
		if (this.props.patient === false) {
			return '';
		} else {
			return this.props.patient.single_player_patient[`${data}`];
		}
	};

	mapScheduled = () => {
		const list = this.props.scheduled.map((pt) => {
			pt.key = pt.single_player_patient.id;
			pt.text = pt.single_player_patient.first_name + ' ' + pt.single_player_patient.last_name;
			pt.value = pt.single_player_patient.id;
			return pt;
		});
		return list;
	};

	roomPatient = (e, d) => {
		const patient = d.options.filter((pt) => pt.value === d.value);
		this.props.roomPatient(patient[0]);
	};

	render() {
		const tempDrug = [
			{ key: 'penicillin', text: 'penicillin', value: 'penicillin' },
			{ key: 'sulfa dugs', text: 'sulfa dugs', value: 'sulfa dugs' },
			{ key: 'amoxicillin', text: 'amoxicillin', value: 'amoxicillin' }
		];

		return (
			<React.Fragment>
				<div className="chart">
					<div className="scheduledPatients">
						<Dropdown
							selectOnNavigation={false}
							name="scheduledPatients"
							placeholder="Scheduled patients"
							fluid
							search
							selection
							options={this.mapScheduled()}
							onChange={this.roomPatient}
						/>
					</div>

					<Card color="teal">
						<Image src={`https://react.semantic-ui.com/images/${this.gender(this.ptEmpty('gender'))}`} />
						<Card.Content>
							<Card.Header>{this.ccEmpty('name')}</Card.Header>
							<Card.Meta>{this.ccEmpty('chief_complaint')}</Card.Meta>
							<Card.Description>
								{this.props.patient ? (
									<React.Fragment>
										{this.ccEmpty('name')}: I'm here for {this.ccEmpty('chief_complaint')}.{<br />}
										{<br />}
										You: When did it start? {<br />}
										{<br />}
										{this.ccEmpty('name')}: It all started couple days ago when I was hiking. ....
									</React.Fragment>
								) : null}
							</Card.Description>
						</Card.Content>

						<Card.Content extra>
							{this.props.patient ? (
								<Popup
									pinned={true}
									position="bottom center"
									hoverable
									on="hover"
									trigger={
										<Button
											className="checkoutBtn"
											size="small"
											onClick={() => this.props.checkout(this.props.patient)}
										>
											checkout
										</Button>
									}
									content="Patient will be removed and the chart will not be saved"
									style={{
										bordeRadius: 5,
										opacity: 0.7,
										padding: '2em'
									}}
									inverted
								/>
							) : null}
						</Card.Content>
					</Card>



					<Form onSubmit={this.handleSubmit} className="chartgrid">
						<Form.Group className="HPI">
							<Form.TextArea
								disabled={this.props.patient ? false : true}
								label="HPI"
								placeholder=""
								onChange={this.handleChange}
							/>
						</Form.Group>
						<Form.Group className="ROS">
							<Form.TextArea
								disabled={this.props.patient ? false : true}
								label="ROS"
								name="ROS"
								placeholder=""
								onChange={this.handleChange}
							/>
						</Form.Group>
						<Form.Group className="PE">
							<Form.TextArea
								disabled={this.props.patient ? false : true}
								label="PE"
								placeholder=""
								onChange={this.handleChange}
							/>
						</Form.Group>
						<Form.Group grouped className="AP">
							<label>Diagnosis</label>

							<div className="search">
								<Input
									disabled={this.props.patient ? false : true}
									className="diagnosisSearch"
									placeholder="Search for ICD-11"
									onChange={this.handleSearch}
								/>
								<Icon
                  name='search'
									size="large"
									className="diagnosisSearch"
                  // icon={<Icon name="search" />}
                  onClick={(e, d) => this.searchICD11(e, d)}
								/>
							</div>

							<div className="diagnosisDropdown">
								<Dropdown
									disabled={this.props.patient ? false : true}
									selectOnNavigation={false}
									className="diagnosis"
									name="assessment"
									placeholder="Diagnosis"
									fluid
									search
									selection
									closeOnEscape
									selectOnNavigation={false}
									options={this.state.icd_11}
									onChange={this.handleChange}
								/>
							</div>
							<div className="assessmentList">{this.assessmentList()}</div>
							<label>Prescription</label>
							<Dropdown
								disabled={this.props.patient ? false : true}
								selectOnNavigation={false}
								className="rx"
								name="prescription"
								placeholder="Rx"
								fluid
								multiple
								search
								selection
								options={tempDrug}
								onChange={this.handleChange}
							/>
						</Form.Group>
						<Button className="signoff" disabled={this.props.patient ? false : true}>
							{' '}
							Sign off
						</Button>
					</Form>

					<div className="barGrid">
						<NavBarOpener />
					</div>
				</div>
			</React.Fragment>
		);
	}
}
const sToP = (state) => {
	return {
		loggedin: state.manageLogin.loggedin,
		chart: state.manageNavBar.chart,

		patient: state.managePatients.inRoom,
		scheduled: state.managePatients.schedule
	};
};

const dToP = (dispatch) => ({
	login: (data) => dispatch({ type: 'LOGIN', payload: data }),

	roomPatient: (data) => dispatch({ type: 'ADD_TO_ROOM', payload: data }),
	remove: (data) => dispatch({ type: 'BACK_TO_SCHEDULE', payload: data }),
	checkout: (data) => dispatch({ type: 'CHECK_OUT', payload: data })
});

export default connect(sToP, dToP)(LoggedInHOC(Chart));
