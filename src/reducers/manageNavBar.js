export default function manageNavBar(state = {
    show: false,
    room: false
}, action) {
    switch (action.type) {
        case 'TOGGLE':
            return {...state,
                show: !state.show
            }
        case 'ROOM_OPEN':
            return {...state,
                room: true
            }
        case 'ROOM_EMPTY':
            return {...state,
                room: false
            }
        default:
            return state;
    }
}