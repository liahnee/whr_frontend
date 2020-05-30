import React from 'react';
import './assets/stylesheets/App.css';

import { Menu, Sidebar, Icon, Popup } from 'semantic-ui-react';
import { Route, Link, Redirect, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Login from './containers/Login';
import Profile from './containers/Profile';
import Schedule from './containers/Schedule';
import Chart from './containers/Chart';
import Dashboard from './containers/Dashboard';
import NewPatientForm from './containers/NewPatientForm';
import Home from './containers/Home';

const url ='https://cors-anywhere.herokuapp.com/https://immense-thicket-18399.herokuapp.com/' +  '/api/v1/';

class App extends React.Component {
	logged() {
		if (localStorage.token) {
			const data = {
				user: {
					username: localStorage.username,
					name: localStorage.name,
					id: localStorage.id
				}
			};
			this.props.login(data);
			return <Home />;
		} else {
			return <Redirect to="login" />;
		}
	}

	// componentDidMount() {

	// }

	handleLogout = () => {
		this.props.toggle();
		localStorage.clear();
		this.props.logout();
		window.location.reload();
	};

	signedNav = () => {
		return <React.Fragment />;
	};

	updatePatientList = () => {
		if (!this.props.allPatients || this.props.allPatients.length === 0 || this.props.allPatients) {
			fetch(url + 'single_player_patients', {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: 'Bearer ' + localStorage.token
				}
			})
				.then((resp) => resp.json())
				.then((data) => this.props.addAllPatients(data));
		}
	};

	render() {
		return (
			<Sidebar.Pushable>
				{this.props.loggedin ? (
					<Sidebar
						as={Menu}
						tabular
						animation="overlay"
						icon="labeled"
						inverted
						onHide={() => this.props.toggle()}
						direction="top"
						visible={this.props.show}
						width="very thin"
					>
						<Menu.Item as={Link} to="/">
							<Icon name="address book outline" />
							Home
						</Menu.Item>
						{!this.props.room ? (
							<Popup
								pinned={true}
								hoverable
								on="hover"
								trigger={
									<Menu.Item disabled>
										<Icon name="clipboard outline" />
										Room
									</Menu.Item>
								}
								content="There is no patient in the schedule"
								style={{
									bordeRadius: 5,
									opacity: 0.7,
									padding: '2em',
									position: 'fixed',
									marginTop: '50px'
								}}
								inverted
							/>
						) : (
							<Menu.Item as={Link} to="/room">
								<Icon name="clipboard outline" />
								Room
							</Menu.Item>
						)}

						<Menu.Item as={Link} to="/new_patient">
							<Icon name="add user" />
							New Pt
						</Menu.Item>
						{/* <Popup
							// offset="0, 200px"
							pinned={true}
							hoverable
							on="hover"
							trigger={
								<Menu.Item as={Link} to="/schedule">
									<Icon name="calendar alternate outline" />
									Follow Up
								</Menu.Item>
							}
							content="In development. Monthly schedule for the patients to be scheduled."
							style={{
								bordeRadius: 5,
								opacity: 0.7,
								padding: '2em',
								position: 'fixed',
								marginTop: '50px'
							}}
							inverted
						/> */}
						{/* <Popup
							// offset="0, 200px"
							pinned={true}
							hoverable
							on="hover"
							trigger={
								<Menu.Item as={Link} to="/profile">
									<Icon name="user md" />
									Profile
								</Menu.Item>
							}
							content="In development. Can delete patients here. Can change your profile pic, names, etc."
							style={{
								bordeRadius: 5,
								opacity: 0.7,
								padding: '2em',
								position: 'fixed',
								marginTop: '50px'
							}}
							inverted
						/> */}
						<Menu.Item onClick={() => this.handleLogout()} position="right">
							<Icon name="sign out" />
							Sign-out
						</Menu.Item>
					</Sidebar>
				) : null}
				<Sidebar.Pusher dimmed={this.props.show}>
					<Switch>
						<Route exact path="/">
							{this.props.loggedin ? <Home updatePatientList={this.updatePatientList} /> : this.logged()}
						</Route>
						<Route exact path="/login">
							<Login />
						</Route>
						<Route exact path="/dashboard">
							<Dashboard />
						</Route>
						{/* <Route exact path="/profile">
							<Profile />
						</Route> */}
						<Route exact path="/schedule">
							<Schedule />
						</Route>
						<Route exact path="/room">
							{!this.props.room ? <Redirect to="/" /> : <Chart />}
						</Route>
						<Route exact path="/new_patient">
							<NewPatientForm updatePatientList={this.updatePatientList} />
						</Route>
						<Route render={() => <div>Page Not Found</div>} />
					</Switch>
				</Sidebar.Pusher>
			</Sidebar.Pushable>
		);
	}
}

const sToP = (state) => {
	return {
		loggedin: state.manageLogin.loggedin,
		show: state.manageNavBar.show,
		room: state.manageNavBar.room
	};
};

const dToP = (dispatch) => ({
	login: (data) => dispatch({ type: 'LOGIN', payload: data }),
	logout: () => dispatch({ type: 'LOGOUT' }),
	toggle: () => dispatch({ type: 'TOGGLE' }),
	addAllPatients: (data) => dispatch({ type: 'ADD_ALL_PATIENTS', payload: data })
});

export default withRouter(connect(sToP, dToP)(App));
