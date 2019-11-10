import React from 'react';
import { Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import NavBarOpener from '../componentsNavBar/NavBarOpener';
import ReactTable from 'react-table';

const url = 'http://localhost:3000/api/v1/';

class Home extends React.Component {

    state = {
        patients: [{name: 'patient1'}],
        charts: [{chief_complaint: 'fever', last_visit:'11-4-2019', recovery_rate: '0%'}],
        selectedPatient: {},
        patientModal: false,
        selectedChart: {},
        chartModal: false
    }
    
    componentDidMount() {
        // fetch(url + 'chart')

        fetch(url+'single_player_patients', {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': 'Bearer ' + localStorage.token
        }})
        .then(resp => resp.json())
        .then(data => this.props.addAllPatients(data))
        .then(() => this.mapPatients())
    }

    mapPatients = () => {
        const patientList = this.props.allPatients.map( patient => {
            return {name: `${patient.first_name} ${patient.last_name}`}
        });
        this.setState({
            patients:[...patientList]
        })
    };

    mapCharts = () => {
        const charts = this.state.charts.map(chart => {
            return {chief_complaint: chart.chief_complaint, last_visit: chart.last_visit, recovery_rate: chart.recovery_rate}
        })
        return charts;
    };


    render() {
        const patientColumns =  [{
            Header: 'Patient',
            accessor: 'name'
        }]
    
        const detailColumns = [{
            Header: 'Chief Complaint',
            accessor: 'chief_complaint'
        }, {
            Header: 'Last Visit',
            accessor: 'last_visit'
        }, {
            Header: 'Recovery Rate',
            accessor: 'recovery_rate'
        }]

        const allPatients = this.props.allPatients
        const statePatients = this.state.patients
        return (
            <React.Fragment>
                <div className='homePG'>
                    <div className='homeCharts'>
                        <ReactTable className='homePatientList' data={this.state.patients} columns={patientColumns} defaultPageSize={10}  showPagination={false}/>
                        <ReactTable className='homeChartList' resolveData={this.mapCharts} columns={detailColumns} defaultPageSize={10} SubComponent={ row => {
                            return (
                                <div> what is this
                                <Modal></Modal>
                                </div>
                            )
                        }}/>
                    </div>
                    <div className='barGrid'>
                        <NavBarOpener />  
                    </div>
                </div>
            </React.Fragment>
        )
    }
};

const sToP = state => {
    return (
        {loggedin: state.manageLogin.loggedin, allPatients: state.managePatients.allPatients}
    )
}

const dToP = dispatch => ({
    login: data => dispatch({ type: "LOGIN", payload:data}),
    addAllPatients: data => dispatch({ type: "ADD_ALL_PATIENTS", payload: data})
})

export default connect(sToP, dToP)(Home);