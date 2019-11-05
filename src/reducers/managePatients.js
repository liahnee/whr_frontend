export default function managePatients(state = {
    allPatients: [],
    waitList: [],
    inRoom: {}
}, action) {
    switch (action.type) {
        case 'ADD_TO_WAITLIST':
            return {...state,
                allPatients: state.allPatients.filter(patient => patient.id !== action.payload.id),
                waitList: state.waitList.concat(action.payload)
            };
        case 'DELETE_FROM_WAITLIST':
            return {...state,
                allPatients: state.allPatients.concat(action.payload),
                waitList: state.waitList.filter(patient => patient.id !== action.payload.id),
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
    }
}