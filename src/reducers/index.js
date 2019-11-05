import { combineReducers } from 'redux'
import managePatients from './managePatients'
import manageLogin from './manageLogin'

export default combineReducers({
  manageLogin,
  managePatients
})