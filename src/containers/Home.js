import React from 'react';
import { Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import NavBarOpener from '../componentsNavBar/NavBarOpener';
import ReactTable from 'react-table';

const url = 'http://localhost:3000/api/v1/';


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

// const chartColumns = [{
//     Header: 'Diagnosis',
//     accessor: 'diagnosis'
// }, {
//     Header: 'Date',
//     accessor: 'visited'
// }, {
//     Header: 'Recovery Rate',
//     accessor: 'recovery_rate'
// }]

class Home extends React.Component {

    state = {
        patients: [{name: 'patient1', id: 1}, {name: 'patient2', id: 2}, {name: 'patient3', id: 3}],
        selectedPatient: {name: 'patient1', id: 1},
        selectedPatientProblems: [{chief_complaint: 'fever', last_visit:'11-1-2019', recovery_rate: '60%'}],
        // patientAllCharts: [],
        // charts: [{diagnosis: 'Influenza', visited: '11-1-2019', recovery_rate: '60%'}, {diagnosis: 'Influenza', visited: '10-30-2019', recovery_rate: '50%'}, {diagnosis: 'Influenza', visited: '10-28-2019', recovery_rate: '0%'}],
        // selectedChart: {},
        // chartModal: false
    }
    
    componentDidMount() {
        // fetch(url + 'chart')

        //works. temporarily off for structuring flow of patient list => selected patient => patient chief complaints => charts 

        fetch(url+'single_player_patients', {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Authorization': 'Bearer ' + localStorage.token
        }})
        .then(resp => resp.json())
        .then(data => this.props.addAllPatients(data))
        .then(() => this.mapPatients(), this.formatCharts())
    }

    mapPatients = () => {
        const patientList = this.props.allPatients.map( patient => {
            return {name: `${patient.first_name} ${patient.last_name}`}
        });
        this.setState({
            patients:[...patientList]
        })
    };

    formatCharts = () => {
        const newChart = {}
        charts.map( chart => {
            const id = chart.chief_complaint_id;

            newChart[id] = [];
            
            newChart[id].push({ diagnosis: chart.diagnosis, visited: chart.visited, recovery_rate: chart.recovery_rate});
            return chart;
        })
    }

    onPatientClick = (state, rowInfo, column, instance) => {
        return {
            onClick: (e, handleOriginal) => {
                // console.log('A Td Element was clicked!')
                // console.log('state:', state)
                // console.log('it produced this event:', e)
                // console.log('It was in this column:', column)
                // console.log('It was in this row:', rowInfo)
                // console.log('It was in this row:', rowInfo.original)
                // console.log('It was in this row:', rowInfo.original.id)

                // console.log('It was in this table instance:', instance)

                if (handleOriginal) {
                    this.setState({
                        selectedPatient: rowInfo.original
                    }, () => this.mapProblems())
                }
            }
        }
    }

    mapProblems = () => {
        // const patientId = this.state.selectedPatient.id
        // const patientProblems = chief_complaints.filter(problem => problem.patient_id === patientId)
        // const problemRows = patientProblems.map( problem => { 
        //     const latest = mostRecentChart(problem)
        //     return {chief_complaint: problem.chief_complaint, last_visit: latest.visited, recovery_rate: latest.recovery_rate}
        // } ) 

        // this.setState({
        //     selectedPatientProblems: [...patientProblems]
        // })
    }

    mapCharts = () => {
        const charts = this.state.charts.map(chart => {
            return {diagnosis: chart.diagnosis, visited: chart.visited, recovery_rate: chart.recovery_rate}
        })
        return charts;
    };


    
    chartToProb = (chart) => {
        return { diagnosis: chart.diagnosis, last_visit: chart.visited, recovery_rate: chart.recovery_rate }
    }

    checkList = (list, diagnosis) => {
        return list.filter(obj => obj.diagnosis === diagnosis)

    }
    
    // last_visits = (rowInfo) => {
    //     console.log('Patient clicked!')
    //     const patientCharts = charts.filter(chart => chart.patient_id === rowInfo.original.id );
    //     // const problems = [...new Set(patientCharts.map(chart => chart.diagnosis))];
    
    //     const list = [];
    
    //     patientCharts.map(chart => {
    //         const diagnosis = chart.diagnosis;
    //         const prev = this.checkList(list, diagnosis)
    //         console.log(list)
    //         console.log(prev)
    //         if(prev.length !== 0) {
    //             if(this.year(chart.visited) > this.year(prev.last_visit)) {
    //                 list.push(this.chartToProb(chart));
    //             } else if (this.year(chart.visited) === this.year(prev.last_visit)) {
    //                 if(this.month(chart.visited) > this.month(prev.last_visit)) {
    //                     list.push(this.chartToProb(chart));
    //                 } else if (this.month(chart.visited) > this.month(prev.last_visit)) {
    //                     if(this.day(chart.visited) > this.day(prev.last_visit)) {
    //                         list.push(this.chartToProb(chart));
    //                     }
    //                 } 
    //             } 
    //        } else {
    //             list.push(this.chartToProb(chart));
    //        }
    //        return chart
    //     })
    
    //     console.log("list:", list)
    //     this.setState({
    //         selectedPatient: rowInfo.original,
    //         patientAllCharts: [...patientCharts],
    //         problems: [list]
    //     })
    
    // }

    // mapProblemChart = (row) => {
    //     const chief_complaint = row.original.chief_complaint
    // }

    render() {

        return (
            <React.Fragment>
                <div className='homePG'>
                    <div className='homeCharts'>
                        <ReactTable className='homePatientList' data={this.state.patients} columns={patientColumns} defaultPageSize={10}  showPagination={false} getTdProps={this.onPatientClick}/>

                        <ReactTable className='homeProblemList' data={this.state.selectedPatientProblems} columns={detailColumns} defaultPageSize={10} SubComponent={ row => { console.log(row); return <div>list of charts for the selected problem</div> }}
                        // <ReactTable className='homeChartList' data={this.state.charts} columns={chartColumns} showPagination={false} defaultPageSize={3} />}} 
                        />
                    </div>
                    <Modal>
                    </Modal>
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



const charts = [{
    chief_complaint_id: 1, diagnosis: 'Influenza', visited: '11-1-2019', recovery_rate: '60%'
}, {
    chief_complaint_id: 1, diagnosis: 'Influenza', visited: '10-30-2019', recovery_rate: '50%'
}, {
    chief_complaint_id: 1, diagnosis: 'Influenza', visited: '10-28-2019', recovery_rate: '0%'
}, {
    chief_complaint_id: 2, diagnosis: 'Vitamin D Deficiency', visited: '11-1-2019', recovery_rate: '100%'
}, {
    chief_complaint_id: 2, diagnosis: 'Vitamin D Deficiency', visited: '10-30-2019', recovery_rate: '0%'
}, {
    chief_complaint_id: 3, diagnosis: 'Contact Dermatitis', visited: '10-28-2019', recovery_rate: '0%'
},{
    chief_complaint_id: 4, diagnosis: 'Sprain of ankle', visited: '11-1-2019', recovery_rate: '0%'
}, {
    chief_complaint_id: 5, diagnosis: 'Viral intestinal infection', visited: '11-05-2019', recovery_rate: '100%'
}, {
    chief_complaint_id: 5, diagnosis: 'Viral intestinal infection', visited: '10-28-2019', recovery_rate: '0%'
}]


// onRowClick = (state, rowInfo, column, instance) => {
//     return {
//         onClick: (e, handleOriginal) => {
//             // console.log('A Td Element was clicked!')
//             // console.log('state:', state)
//             // console.log('it produced this event:', e)
//             // console.log('It was in this column:', column)
//             // console.log('It was in this row:', rowInfo)
//             // console.log('It was in this table instance:', instance)

//             if (handleOriginal) {
//                 // console.log("clicked for diff function")
//             }
//         }
//     }
// }
// const mostRecentChart = (problem) => {
//     const latest charts 
// }         
