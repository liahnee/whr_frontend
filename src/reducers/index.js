import { combineReducers } from 'redux';
import managePatients from './managePatients';
import manageLogin from './manageLogin';
import manageNavBar from './manageNavBar';
import manageCC from './manageCC';
import manageCharts from './manageCharts';

export default combineReducers({
  manageLogin,
  managePatients,
  manageNavBar,
  manageCharts,
  manageCC
})