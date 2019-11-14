import React from 'react';
import '../home.css';
import { Icon, Popup } from 'semantic-ui-react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import NavBarOpener from '../componentsNavBar/NavBarOpener';
import ReactTable from 'react-table';
import NewCC from '../componentsHome/NewCC';

const url = 'http://localhost:3000/api/v1/';

class Home extends React.Component {
	state = {
		newCC: false, // newCC modal
		ccList: [],
		patients: [], // table data
		scheduledPatients: [] //table data
	};

	componentDidMount() {
		// console.log(this.props.allPatients)

		// this.props.updatePatientList()
		if (!this.props.allPatients || this.props.allPatients.length === 0 || this.props.allPatients) {
			fetch(url + 'single_player_patients', {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: 'Bearer ' + localStorage.token
				}
			})
				.then((resp) => resp.json())
				.then((data) => this.props.addAllPatients(data))
				.then(() => this.mapPatients());
		} 

	}



	mapPatients = () => {
		const patientList = this.props.allPatients.map((patient) => {
			return { name: `${patient.first_name} ${patient.last_name}`, id: patient.id };
		});
		this.setState({
			patients: [ ...patientList ]
		});
	};

	toggle = (e) => {
		this.setState({
			newCC: !this.state.newCC
		});
	};

	handleAddCC = (row) => {
		this.props.selectForCC(row._original);
		this.toggle();
	};

	handleRenderCC = async (row) => {
		await this.props.selectForCC(row._original);
		this.fetchPatientCC();
	};

	fetchPatientCC = async () => {
		const { id } = this.props.selectedForCC;
		await fetch(url + 'sp_chief_complaints/' + id, {
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: 'Bearer ' + localStorage.token
			}
		})
			.then((resp) => resp.json())
			.then((data) => {
				// if (data.length !== 0) {
				this.props.addCC(data);
				// } else {
				// 	this.props.addCC([ { chief_complaint: 'No Chief Complaint' } ]);
				// }
			});
	};

	renderScheduleData = (data) => {
		data.name = data.single_player_patient.first_name + ' ' + data.single_player_patient.last_name;
		this.props.selectForSchedule(data);
		if (this.props.room === false) {
			this.props.openRoom();
		}
	};

	checkout = (row) => {
		console.log(row._original)
		
	}

	render() {
		const patientColumns = [
			{Header: () => <h4>All Patients</h4>,
			columns: [{
				Header: () => <div className="newCCLabel" />,
				Cell: ({ row }) => (
					<div className="newCCBtn">
						<Popup
						// offset="0, 200px"
						pinned={true}
						hoverable
						position='bottom left'
						on="hover"
						trigger={
						<Icon circular name="plus circle" size="large" onClick={() => this.handleAddCC(row)} />
					}
						content="Click to add new chief complaints. Multiple can be created."
						style={{
							bordeRadius: 5,
							opacity: 0.7,
							padding: '2em',
							// position: 'fixed',
							// marginTop: '50px'
						}}
						inverted
					/>
					</div>
				),
				width: 50
			},
			{
				Header: 'Patient',
				accessor: 'name',
				Cell: ({ row }) => {
					return (
						
						<h3 className="hoverColor" onClick={() => this.handleRenderCC(row)}>
							{row.name}
						</h3>
						
					);
				},
				width: 100
			}]
		}
			
		];

		const ccColumns = [
			{Header: () => <h4>Patient Information</h4>,
			columns: [{
			
				Header: 'Chief Complaint',
				accessor: 'chief_complaint',
				Cell: ({ row }) => {
					const data = row._original;
					return (
						<h3 className="hoverColor" onClick={() => this.renderScheduleData(data)}>
							{row.chief_complaint}
						</h3>
					);
				}
			},
			{
				Header: 'Last Visit',
				accessor: 'last_visit'
			},
			{
				Header: 'Recovery Rate',
				accessor: 'recovery_rate'
			}]}
		];

		const scheduleColumns = [
			{Header: () => <h4>Patients on Schedule</h4>,
			columns: [
			{
				Header: () => <div className="newCCLabel" />,
				Cell: ({ row }) => (
					<div className="newCCBtn">
						<Icon circular name="minus" size="large" onClick={() => this.props.checkout(row._original)} />
					</div>
				),
				width: 50
			},
			{
				Header: 'Patient',
				accessor: 'name',
				Cell: ({ row }) => <h3>{row.name}</h3>
			},
			{
				Header: 'Chief Complaint',
				accessor: 'chief_complaint',
				Cell: ({ row }) => <h3>{row.chief_complaint}</h3>
			}]}
		];
		

		return (
			<div className="homePG">
				<NewCC fetch={this.fetchPatientCC} open={this.state.newCC} toggle={this.toggle} />
				<div className="homeCharts">
					<ReactTable
						className="homePatientList"
						data={this.state.patients}
						columns={patientColumns}
						defaultPageSize={10}
						showPagination={false}
					/>

					<ReactTable
						className="homeProblemList"
						data={this.props.ccList}
						columns={ccColumns}
						defaultPageSize={10}
						SubComponent={(row) => {
							console.log(row);
							return <div>list of charts for the selected problem</div>;
						}}
						// <ReactTable className='homeChartList' data={this.state.charts} columns={chartColumns} showPagination={false} defaultPageSize={3} />}}
					/>
					<ReactTable
						className="scheduleList"
						data={this.props.selectedForSchedule}
						columns={scheduleColumns}
						showPagination={false}
						defaultPageSize={100}
					/>
				</div>
				<div className="barGrid">
					<NavBarOpener />
				</div>
			</div>
		);
	}
}

const sToP = (state) => {
	return {
		loggedin: state.manageLogin.loggedin,
		allPatients: state.managePatients.allPatients,
		ccList: state.manageCC.allCC,
		chartList: state.manageCharts.allCharts,
		selectedForCC: state.manageCC.patient,
		selectedForSchedule: state.managePatients.schedule,
		room: state.manageNavBar.chart
	};
};

const dToP = (dispatch) => ({
	login: (data) => dispatch({ type: 'LOGIN', payload: data }),
	addAllPatients: (data) => dispatch({ type: 'ADD_ALL_PATIENTS', payload: data }),

	selectForCC: (data) => dispatch({ type: 'PATIENT_TO_VIEW_CC', payload: data }),
	addCC: (data) => dispatch({ type: 'ADD_CC', payload: data }), //data should hold data.patient and either data.newcc or data.cc

	selectForSchedule: (data) => dispatch({ type: 'ADD_TO_SCHEDULE', payload: data }),
	openRoom: () => dispatch({ type: 'ROOM_OPEN' }),
	checkout: (data) => dispatch({ type: 'CHECK_OUT', payload: data })
});

export default connect(sToP, dToP)(Home);
