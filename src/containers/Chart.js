import React from 'react';
import { connect } from 'react-redux';
import NavBarOpener from '../componentsNavBar/NavBarOpener';
import LoggedInHOC from '../HOC/SignedIn';
import { Form, Dropdown, Button, Card, Message, Image } from 'semantic-ui-react';
import '../chart.css'

const url = 'http://localhost:3000/api/v1/icd_11';

class Chart extends React.Component {
	state = {
		HPI: '',
		ROS: '',
		PE: '',
		assessment: [],
    prescription: [],
    icd_11: []
	};

	handleChange = (e, d) => {
		const key = d.name;
    const value = d.value;
		switch (key) {
			case 'assessment':
				return this.setState( {
					assessment: [...this.state.assessment, ...value]
				});
			case 'prescription':
				return this.setState({
					prescription: [...this.state.prescription, value]
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
  

  searchICD11 = async (e, d) => {
    console.log(d.value);
    const keyword = d.value;
  
    if (this.state.result) {
      const { result } = this.state;
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Authorization': 'Bearer ' + localStorage.token
        },
        body: JSON.stringify({ keyword, result})
      })
      .then(resp => resp.json())
      .then(data => {
        console.log("in .then data:", data)
        const mapped = renderFetch(data);
        this.setState({
          icd_11: mapped
        })
      })
    } else {
      const result = await fetch(url).then(resp => resp.json());
      this.setState({
        result: result 
      });
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Authorization': 'Bearer ' + localStorage.token
        },
        body: JSON.stringify({ keyword, result})
      })
      .then(resp => resp.json())
      .then(data => {
        console.log("in .then data:", data)
        const mapped = renderFetch(data);
        this.setState({
          icd_11: mapped
        })
      })
    }
  }

	handleSubmit = (e) => {
		e.preventDefault();
	};

	render() {
		// const tempMedical = [
		// 	{ key: 'asthma', text: 'asthma', value: 'asthma' },
		// 	{ key: 'diabetes', text: 'diabetes', value: 'diabetes' },
		// 	{ key: 'seizures', text: 'seizures', value: 'seizures' }
		// ];

		const tempDrug = [
			{ key: 'penicillin', text: 'penicillin', value: 'penicillin' },
			{ key: 'sulfa dugs', text: 'sulfa dugs', value: 'sulfa dugs' },
			{ key: 'amoxicillin', text: 'amoxicillin', value: 'amoxicillin' }
		];

		return (
			<React.Fragment>
				<div className="chart">
					<span>
						<Card color="teal">
							<Image src="https://react.semantic-ui.com/images/avatar/large/molly.png" />
							<Card.Content>
								<Card.Header>Steve Sanders</Card.Header>
								<Card.Meta>Chief Complaint</Card.Meta>
								<Message
									error
									header="sulfa drugs"
									// content=""
								/>
							</Card.Content>
						</Card>
						<Form onSubmit={this.handleSubmit} className="chartgrid">
							<Form.Group className="HPI">
								<Form.TextArea
									label="HPI"
									placeholder=""
									onChange={(e, d) => this.handleChange(e, d)}
								/>
							</Form.Group>
							<Form.Group className="ROS">
								<Form.TextArea
									label="ROS"
									placeholder=""
									onChange={(e, d) => this.handleChange(e, d)}
								/>
							</Form.Group>
							<Form.Group className="PE">
								<Form.TextArea label="PE" placeholder="" onChange={(e, d) => this.handleChange(e, d)} />
							</Form.Group>
							<Form.Group grouped className="AP">
								{/* <Form.Field> */}
								<label>Diagnosis</label>
                
                <div className='diagnosisDropdown'>
                  <Dropdown
                    className = 'diagnosis'
                    name="assessment"
                    placeholder="Diagnosis"
                    fluid
                    multiple
                    search
                    selection
                    allowAdditions
                    closeOnEscape
                    selectOnNavigation={false}
                    // closeOnBlur={false}
                    options={this.state.icd_11}
                    onAddItem={this.searchICD11}
                    onChange={this.handleChange}
                  />
{/*                   
                  <Button icon className='diagnosisBtn' onClick={this.searchICD11}> 
                    <Icon inverted name='search' />
                  </Button>  */}
                  
                </div>
								<label>Prescription</label>
								<Dropdown
                  className = 'rx'
									name="prescription"
									placeholder="Rx"
									fluid
									multiple
									search
									selection
									options={tempDrug}
									onChange={this.handleChange}
								/>
								{/* </Form.Field> */}
							</Form.Group>
							<Button className="signoff">Sign off</Button>
						</Form>
					</span>
					<div className="barGrid">
						<NavBarOpener />
					</div>
				</div>
			</React.Fragment>
		);
	}
}
const sToP = (state) => {
	return { loggedin: state.manageLogin.loggedin };
};

const dToP = (dispatch) => ({
	login: (data) => dispatch({ type: 'LOGIN', payload: data })
});

export default connect(sToP, dToP)(LoggedInHOC(Chart));


const renderFetch = (data) => {
  console.log("data.response", data.response.destinationEntities);
  const newData = [];
  data.response.destinationEntities.map( data => {
    let text = data.title
    const value = data.title 
    const { id } = data;
    const key = data.id
    if(data.title.includes('<em')){
      text = text.replace("<em class='found'>", "");
      text = text.replace("</em>", "");
    } 
    newData.push({ text, value, id, key });
    return data
  })
  return newData
}