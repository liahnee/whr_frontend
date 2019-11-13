import React from 'react';
import '../assets/stylesheets/Schedule.css';
import { connect } from 'react-redux';
import NavBarOpener from '../componentsNavBar/NavBarOpener';
import LoggedInHOC from '../HOC/SignedIn';
import ReactTable from 'react-table';
import NewCC from '../componentsSchedule/NewCC';
import { Icon } from 'semantic-ui-react';

const url = 'http://localhost:3000/api/v1/';

const ccColumns = [{
  Header: 'Chief Complaint',
  accessor: 'chief_complaint'
}, {
  Header: 'Last Visit',
  accessor: 'last_visit'
}, {
  Header: 'Recovery Rate',
  accessor: 'recovery_rate'
}]

class Schedule extends React.Component {
	state = {
		newCC: false, // newCC modal 
    ccList: [],
    patients: [] // table column data
	};

	componentDidMount() {
    if (this.props.allPatients.length === 0) {
      fetch(url + 'single_player_patients', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + localStorage.token
        }
      })
        .then((resp) => resp.json())
        .then((data) => this.props.addAllPatients(data))
        .then(() => this.mapPatients())
    } else {
      this.mapPatients();
    }
	}

  mapPatients = () => {
    console.log(this.props.allPatients)
		const patientList = this.props.allPatients.map((patient) => {
      console.log(patient)
			return { name: `${patient.first_name} ${patient.last_name}`, id: patient.id };
    });
    console.log(patientList)
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
    this.props.selectPatient(row._original);
    this.toggle();
	};

  handleRenderCC = async (row) => {
    await this.props.selectPatient(row._original);
    this.fetchPatientCC();
  }

  fetchPatientCC = async () => {
    console.log(this.props.selectedPatient)
    const { id } = this.props.selectedPatient
    await fetch(url + 'sp_chief_complaints/' + id, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.token
      }
    })
    .then(resp => resp.json()) 
    .then(data => {
      if ( data.length !== 0 ) {
        console.log(data)
        this.props.addCC(data)
      } else {
        console.log(data)
        this.props.addCC([{chief_complaint: "No Chief Complaint"}])
      }
    })
  }
  callAddCC = () => {

  }

	render() {
		const patientColumns = [
			{
				id: 'add_new_chief_complaint',
				Header: () => <div className="newCCLabel" />,
				Cell: ({ row }) => (
					<div className="newCCBtn">
						<Icon circular name="plus circle" size="large" onClick={() => this.handleAddCC(row)} />
					</div>
				),
				width: 50
			},
			{
				Header: 'Patient',
        accessor: 'name',
        Cell: ({ row }) => { return (
        <label onClick={() => this.handleRenderCC(row)}>{row.name}</label>
        )}
        ,
				width: 100
			}
		];

		return (
			<div className="schedule">
				<NewCC fetch={this.fetchPatientCC} open={this.state.newCC} toggle={this.toggle} />
				<div>
					<div className="scheduleCharts">
						<ReactTable
							className="schedulePatientList"
							data={this.state.patients}
							columns={patientColumns}
							defaultPageSize={10}
							showPagination={false}
							getTdProps={this.onPatientClick}
						/>

						<ReactTable className='scheduleProblemList' data={this.props.ccList} columns={ccColumns} defaultPageSize={10} SubComponent={ row => { console.log(row); return <div>list of charts for the selected problem</div> }}
                    // <ReactTable className='homeChartList' data={this.state.charts} columns={chartColumns} showPagination={false} defaultPageSize={3} />}} 
                    />
					</div>
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
    selectedPatient: state.manageCC.patient
  };
};

const dToP = (dispatch) => ({
	login: (data) => dispatch({ type: 'LOGIN', payload: data }),
  addAllPatients: (data) => dispatch({ type: 'ADD_ALL_PATIENTS', payload: data }),
  selectPatient: (data) => dispatch({ type: 'PATIENT_TO_VIEW_CC', payload: data}),
  addCC: (data) => dispatch({ type: 'ADD_CC', payload: data}), //data should hold data.patient and either data.newcc or data.cc
  schedule: (data) => dispatch({ type: 'ADD_TO_SCHEDULE', payload: data})
});

export default connect(sToP, dToP)(LoggedInHOC(Schedule));
