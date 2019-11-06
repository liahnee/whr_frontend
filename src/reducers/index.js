import { combineReducers } from 'redux';
import managePatients from './managePatients';
import manageLogin from './manageLogin';
import manageNavBar from './manageNavBar';

export default combineReducers({
  manageLogin,
  managePatients,
  manageNavBar
})