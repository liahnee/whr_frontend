export default function managePatients(state = {
    allPatients: [],
    schedule: [],
    inRoom: false,
    in_view: {}
}, action) {
    switch (action.type) {
        case 'ADD_FOR_VIEW':
            return {...state,
                in_view: action.payload.patient
            };
        case 'ADD_TO_SCHEDULE':
            if (state.schedule.includes(action.payload)){
                return state
            } else if (state.inRoom !== false && state.inRoom.id === action.payload.id) {
                return state
            } 
            else if (state.inRoom !== false && state.inRoom.single_player_patient.id === action.payload.single_player_patient.id) {
                return {...state,
                    schedule: [...state.schedule, action.payload],
                    inRoom: false
                }
            }
            else {
                return {...state,
                    schedule: [...state.schedule.filter( patient => patient.single_player_patient.id !== action.payload.single_player_patient.id), action.payload] 
                }
            }
        case 'DELETE_FROM_SCHEDULE':
            return {...state,
                allPatients: state.allPatients.concat(action.payload),
                // schedule: state.schedule.filter(patient => patient.id !== action.payload.id),
            };
        case 'ADD_TO_ROOM':
            return {...state,
                schedule: state.schedule.filter(patient => patient.single_player_patient.id !== action.payload.single_player_patient.id),
                inRoom: action.payload
            };
        case 'BACK_TO_SCHEDULE':
            return {...state,
                schedule: state.schedule.concat(action.payload),
                inRoom: false,
            };
        case 'CHECK_OUT':
            return {...state,
                inRoom: false,
            };

        case 'ADD_ALL_PATIENTS':
            return {...state,
                allPatients: action.payload.patients
            }
        default:
            return state;
    }
}