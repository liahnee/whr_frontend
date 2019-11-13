import { stat } from "fs";

export default function manageCC(state = {
    patient: {},
    allCC: []
}, action) {
    switch (action.type) {
        case 'ADD_CC':
            if (action.payload.patient === state.patient) {
                return {
                    ...state,
                    allCC: [...state.allCC, action.payload.newCC]
                }
            } else {
                return {
                    patient: action.payload.patient,
                    allCC: [...action.payload.cc]
                }
            }
        default:
            return state;
    }
}