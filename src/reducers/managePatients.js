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
            return {...state,
                allPatients: state.allPatients.filter(patient => patient.id !== action.payload.id),
                schedule: state.scheule.concat(action.payload)
            };
        case 'DELETE_FROM_SCHEDULE':
            return {...state,
                allPatients: state.allPatients.concat(action.payload),
                schedule: state.schedule.filter(patient => patient.id !== action.payload.id),
            };
        case 'ADD_TO_ROOM':
            return {...state,
                waitList: state.waitList.filter(patient => patient.id !== action.payload.id),
                inRoom: state.inRoom.concat(action.payload)
            };
        case 'DELETE_FROM_ROOM':
            return {...state,
                allPatients: state.allPatients.concat(action.payload),
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