export default function managePatients(state = {
    allPatients: [],
    schedule: [],
    inRoom: {},
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
            } else {
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
                schedule: state.schedule.filter(patient => patient.id !== action.payload.id),
                inRoom: state.inRoom.concat(action.payload)
            };
        case 'DELETE_FROM_ROOM':
            return {...state,
                schedule: state.schedule.concat(action.payload),
                inRoom: state.inRoom.filter(patient => patient.id !== action.payload.id),
            };
        case 'ADD_ALL_PATIENTS':
            return {...state,
                allPatients: action.payload.patients
            }
        default:
            return state;
    }
}